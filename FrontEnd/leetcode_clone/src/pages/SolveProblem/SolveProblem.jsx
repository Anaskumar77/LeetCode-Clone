import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblemById } from '../../store/slices/problemsSlice';
import api from '../../api/apiClient';
import './SolveProblem.css';

/* ────────────────────────────────────────────────
   SolveProblem — full code workspace page
   Based on Google Stitch "Code Editor – CodeStorm"
──────────────────────────────────────────────── */

export default function SolveProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected: problem, loading: problemLoading } = useSelector((s) => s.problems);

  // ── Local State ────────────────────────────────
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [leftTab, setLeftTab] = useState('description');    // description | solutions | submissions
  const [consoleTab, setConsoleTab] = useState('testcase');  // testcase | result
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const textareaRef = useRef(null);

  // ── Fetch problem + test cases ─────────────────
  useEffect(() => {
    if (id) {
      dispatch(fetchProblemById(id));
      api.get(`/problems/test-case/${id}`)
        .then((data) => {
          const sampleCases = data.filter((tc) => tc.sample !== false);
          setTestCases(sampleCases.length > 0 ? sampleCases : data.slice(0, 3));
        })
        .catch(() => setTestCases([]));
    }
  }, [id, dispatch]);

  // ── Pre-fill starter code ──────────────────────
  useEffect(() => {
    if (problem?.starterCode && !code) {
      setCode(problem.starterCode);
    }
  }, [problem]);

  // ── Line numbers ───────────────────────────────
  const lineCount = code.split('\n').length;

  // ── Textarea tab support ───────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const before = code.substring(0, selectionStart);
      const after = code.substring(selectionEnd);
      const newCode = before + '    ' + after;
      setCode(newCode);
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 4;
          textareaRef.current.selectionEnd = selectionStart + 4;
        }
      });
    }
  }, [code]);

  // ── Run Code (single test case) ────────────────
  const handleRun = async () => {
    if (!problem || running) return;
    setRunning(true);
    setConsoleTab('result');
    setResults(null);

    const tc = testCases[activeTestCase];
    try {
      const result = await api.post('/execute', {
        sourceCode: code,
        stdin: tc?.input || '',
        expectedOutput: tc?.expectedOutput || '',
        timeLimitSeconds: problem.timeLimit || 5,
        functionName: problem.functionName,
        returnType: problem.returnType,
        params: problem.params,
        driverImports: problem.driverImports,
        driverCode: problem.driverCode,
      });
      setResults(result);
    } catch (err) {
      setResults({ status: 'RUNTIME_ERROR', stderr: err.message, passed: false });
    } finally {
      setRunning(false);
    }
  };

  // ── Submit Code ────────────────────────────────
  const handleSubmit = async () => {
    if (!problem || submitting) return;
    setSubmitting(true);
    setConsoleTab('result');
    setResults(null);

    try {
      const result = await api.post('/submission/', {
        problemId: problem.id,
        sourceCode: code,
        languageId: 1, // Python
      });
      // The submission endpoint returns a String status; wrap it
      if (typeof result === 'string') {
        setResults({ status: result, passed: result === 'ACCEPTED' });
      } else {
        setResults(result);
      }
    } catch (err) {
      setResults({ status: 'ERROR', stderr: err.message, passed: false });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Status helpers ─────────────────────────────
  const getStatusClass = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'result-accepted';
      case 'WRONG_ANSWER': return 'result-wrong';
      case 'TIME_LIMIT_EXCEEDED': return 'result-tle';
      default: return 'result-error';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACCEPTED': return '✓ Accepted';
      case 'WRONG_ANSWER': return '✗ Wrong Answer';
      case 'TIME_LIMIT_EXCEEDED': return '⏱ Time Limit Exceeded';
      case 'RUNTIME_ERROR': return '⚠ Runtime Error';
      default: return status;
    }
  };

  const getDifficultyClass = (d) => {
    switch (d?.toUpperCase()) {
      case 'EASY': return 'difficulty-easy';
      case 'MEDIUM': return 'difficulty-medium';
      case 'HARD': return 'difficulty-hard';
      default: return '';
    }
  };

  // ── Parse test case inputs into key/value pairs ──
  const parseTestCaseInputs = (inputStr) => {
    if (!inputStr) return [];
    // Try to parse as JSON lines (each line is a value)
    const lines = inputStr.trim().split('\n');
    if (problem?.params && problem.params.length > 0) {
      return problem.params.map((p, i) => ({
        name: p.name,
        value: lines[i] || '',
      }));
    }
    return lines.map((line, i) => ({
      name: `input_${i + 1}`,
      value: line,
    }));
  };

  // ═══════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════

  return (
    <div className="solve-workspace">
      {/* ── Collapsible Sidebar ── */}
      <aside className="solve-sidebar">
        <div className="sidebar-logo">
          <span className="material-symbols-outlined" style={{ color: '#cebdff', fontSize: 28, flexShrink: 0 }}>storm</span>
          <h1>CodeStorm</h1>
        </div>

        <nav className="sidebar-nav">
          <Link to="/problems" className="nav-item">
            <span className="material-symbols-outlined">task</span>
            <span>Problems</span>
          </Link>
          <button className="nav-item active">
            <span className="material-symbols-outlined">code</span>
            <span>Editor</span>
          </button>
          <button className="nav-item">
            <span className="material-symbols-outlined">emoji_events</span>
            <span>Contests</span>
          </button>
          <button className="nav-item">
            <span className="material-symbols-outlined">forum</span>
            <span>Discuss</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="solve-action-buttons" style={{ marginTop: 'auto', marginBottom: 16 }}>
          <button className="btn-run" onClick={handleRun} disabled={running || !problem}>
            {running ? 'Running…' : 'Run'}
          </button>
          <button className="btn-submit" onClick={handleSubmit} disabled={submitting || !problem}>
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>

        <div className="sidebar-user">
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', flexShrink: 0 }} />
          <div className="sidebar-user-actions">
            <button className="toolbar-icon-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
            </button>
            <button className="toolbar-icon-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <main className="solve-main">
        {/* ── Left Panel: Problem Description ── */}
        <div className="solve-left-panel">
          {/* Tabs */}
          <div className="panel-tabs">
            <button
              className={`panel-tab ${leftTab === 'description' ? 'active' : ''}`}
              onClick={() => setLeftTab('description')}
            >
              <span className="material-symbols-outlined">description</span>
              Description
            </button>
            <button
              className={`panel-tab ${leftTab === 'solutions' ? 'active' : ''}`}
              onClick={() => setLeftTab('solutions')}
            >
              <span className="material-symbols-outlined">lightbulb</span>
              Solutions
            </button>
            <button
              className={`panel-tab ${leftTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setLeftTab('submissions')}
            >
              <span className="material-symbols-outlined">history</span>
              Submissions
            </button>
          </div>

          {/* Content */}
          <div className="problem-content">
            {problemLoading ? (
              <div className="problem-loading">
                <div className="spinner" />
                Loading problem…
              </div>
            ) : !problem ? (
              <div className="problem-loading">Problem not found.</div>
            ) : leftTab === 'description' ? (
              <>
                {/* Title */}
                <h2>{problem.title}</h2>

                {/* Tags */}
                <div className="problem-tags">
                  <span className={`problem-tag ${getDifficultyClass(problem.difficulty)}`}>
                    {problem.difficulty?.charAt(0) + problem.difficulty?.slice(1).toLowerCase()}
                  </span>
                  {problem.categories?.map((cat, i) => (
                    <span key={i} className="problem-tag category">{cat}</span>
                  ))}
                </div>

                {/* Description */}
                <div dangerouslySetInnerHTML={{ __html: formatDescription(problem.description) }} />

                {/* Sample Test Cases */}
                {testCases.length > 0 && (
                  <>
                    <h3 style={{ color: '#e5e2e3', fontSize: 18, fontWeight: 600, margin: '24px 0 12px' }}>Examples</h3>
                    {testCases.map((tc, idx) => {
                      const inputs = parseTestCaseInputs(tc.input);
                      return (
                        <div key={idx} className="example-block">
                          <div className="example-label">Example {idx + 1}:</div>
                          <div className="example-io">
                            {inputs.map((inp, j) => (
                              <div key={j}><strong>{inp.name} = </strong>{inp.value}</div>
                            ))}
                            <div><strong>Output: </strong>{tc.expectedOutput}</div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Constraints */}
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#e5e2e3', fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Constraints</h3>
                  <div style={{ color: '#cac4d4', fontSize: 14 }}>
                    <p>⏱ Time Limit: {problem.timeLimit || 5}s</p>
                    <p>💾 Memory Limit: {problem.memoryLimit || 128}MB</p>
                  </div>
                </div>
              </>
            ) : leftTab === 'solutions' ? (
              <div style={{ color: '#cac4d4', textAlign: 'center', paddingTop: 48 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.3 }}>lightbulb</span>
                Solutions will be available soon.
              </div>
            ) : (
              <div style={{ color: '#cac4d4', textAlign: 'center', paddingTop: 48 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.3 }}>history</span>
                Submission history coming soon.
              </div>
            )}
          </div>
        </div>

        {/* ── Right Panel: Code Editor + Console ── */}
        <div className="solve-right-panel">
          {/* ── Editor Pane ── */}
          <div className="editor-pane">
            <div className="editor-toolbar">
              <div className="editor-toolbar-left">
                <button className="language-selector">
                  <span className="material-symbols-outlined">code</span>
                  Python 3
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
                </button>
              </div>
              <div className="editor-toolbar-right">
                <button className="toolbar-icon-btn" title="Reset code" onClick={() => setCode(problem?.starterCode || '')}>
                  <span className="material-symbols-outlined">restart_alt</span>
                </button>
                <button className="toolbar-icon-btn" title="Editor Settings">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>

            <div className="code-editor-area">
              <div className="line-numbers">
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} style={{ marginBottom: 1 }}>{i + 1}</div>
                ))}
              </div>
              <div className="code-textarea-wrapper">
                <textarea
                  ref={textareaRef}
                  className="code-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  placeholder="# Write your solution here..."
                />
              </div>
            </div>
          </div>

          {/* ── Console / Test Cases ── */}
          <div className="console-pane">
            <div className="console-toolbar">
              <div className="console-toolbar-left">
                <button
                  className={`console-tab ${consoleTab === 'testcase' ? 'active' : ''}`}
                  onClick={() => setConsoleTab('testcase')}
                >
                  <span className="material-symbols-outlined">terminal</span>
                  Testcase
                </button>
                <button
                  className={`console-tab ${consoleTab === 'result' ? 'active' : ''}`}
                  onClick={() => setConsoleTab('result')}
                >
                  <span className="material-symbols-outlined">science</span>
                  Test Result
                </button>
              </div>
              <button className="toolbar-icon-btn" title="Toggle console">
                <span className="material-symbols-outlined">expand_less</span>
              </button>
            </div>

            <div className="console-content">
              {consoleTab === 'testcase' ? (
                <>
                  {/* Test case tabs */}
                  <div className="testcase-tabs">
                    {testCases.map((_, idx) => (
                      <button
                        key={idx}
                        className={`testcase-tab ${activeTestCase === idx ? 'active' : ''}`}
                        onClick={() => setActiveTestCase(idx)}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Test case inputs */}
                  {testCases[activeTestCase] && (
                    <div>
                      {parseTestCaseInputs(testCases[activeTestCase].input).map((inp, i) => (
                        <div key={i} className="testcase-input-group">
                          <label>{inp.name} =</label>
                          <div className="testcase-value">{inp.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* ── Test Result View ── */
                <>
                  {(running || submitting) ? (
                    <div className="loading-overlay">
                      <div className="spinner" />
                      {running ? 'Running your code…' : 'Submitting…'}
                    </div>
                  ) : results ? (
                    <div>
                      <div className={getStatusClass(results.status)} style={{ fontSize: 18 }}>
                        {getStatusLabel(results.status)}
                      </div>

                      {/* Execution stats */}
                      {(results.executionTimeMs != null || results.memoryUsageKb != null) && (
                        <div className="result-stats">
                          {results.executionTimeMs != null && (
                            <span>
                              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>timer</span>
                              {results.executionTimeMs} ms
                            </span>
                          )}
                          {results.memoryUsageKb != null && (
                            <span>
                              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>memory</span>
                              {(results.memoryUsageKb / 1024).toFixed(1)} MB
                            </span>
                          )}
                        </div>
                      )}

                      {/* Output details */}
                      {results.status === 'WRONG_ANSWER' && (
                        <div className="result-detail">
                          <div className="result-label">Expected Output:</div>
                          <div className="result-value">{results.expectedOutput}</div>
                          <div className="result-label">Your Output:</div>
                          <div className="result-value">{results.actualOutput}</div>
                        </div>
                      )}

                      {/* Stderr */}
                      {results.stderr && (
                        <div className="result-detail">
                          <div className="result-label">Error:</div>
                          <div className="result-value" style={{ color: '#ef4444' }}>{results.stderr}</div>
                        </div>
                      )}

                      {/* Stdout */}
                      {results.stdout && results.status === 'ACCEPTED' && (
                        <div className="result-detail">
                          <div className="result-label">Output:</div>
                          <div className="result-value">{results.stdout}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ color: '#cac4d4', textAlign: 'center', paddingTop: 24, fontSize: 14 }}>
                      Run your code to see results here.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Helper: Format markdown-ish description to HTML
──────────────────────────────────────────────── */
function formatDescription(desc) {
  if (!desc) return '';
  return desc
    // Convert **bold** to <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert `code` to <code>
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Convert \n\n to paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Convert single \n to <br>
    .replace(/\n/g, '<br/>')
    // Wrap in paragraph tags
    .replace(/^(.*)$/, '<p>$1</p>');
}
