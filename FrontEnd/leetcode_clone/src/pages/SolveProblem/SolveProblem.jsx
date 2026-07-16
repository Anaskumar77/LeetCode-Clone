import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblemById } from '../../store/slices/problemsSlice';
import Editor from '@monaco-editor/react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
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
  const [runResults, setRunResults] = useState([]);          // per-case results from Run
  const [activeResultCase, setActiveResultCase] = useState(0); // which result case tab is selected
  const [submitResult, setSubmitResult] = useState(null);    // single result from Submit

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
    if (problem?.starterCode) {
      setCode(problem.starterCode);
    }
    // Reset run/submit results when switching problems
    setRunResults([]);
    setSubmitResult(null);
    setActiveResultCase(0);
    setConsoleTab('testcase');
  }, [problem?.id]);

  // ── Run Code (all visible test cases) ───────────
  const handleRun = async () => {
    if (!problem || running || testCases.length === 0) return;
    setRunning(true);
    setConsoleTab('result');
    setRunResults([]);
    setSubmitResult(null);
    setActiveResultCase(0);

    // Execute all visible test cases in parallel
    const promises = testCases.map((tc) =>
      api.post('/execute', {
        sourceCode: code,
        stdin: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        timeLimitSeconds: problem.timeLimit || 5,
        functionName: problem.functionName,
        returnType: problem.returnType,
        params: problem.params,
        driverImports: problem.driverImports,
        driverCode: problem.driverCode,
      }).catch((err) => ({
        status: 'RUNTIME_ERROR',
        stderr: err.message,
        passed: false,
      }))
    );

    try {
      const allResults = await Promise.all(promises);
      setRunResults(allResults);
    } catch (err) {
      // Fallback: shouldn't reach here since individual promises catch
      setRunResults([{ status: 'RUNTIME_ERROR', stderr: err.message, passed: false }]);
    } finally {
      setRunning(false);
    }
  };

  // ── Submit Code ────────────────────────────────
  const handleSubmit = async () => {
    if (!problem || submitting) return;
    setSubmitting(true);
    setConsoleTab('result');
    setRunResults([]);
    setSubmitResult(null);

    try {
      const result = await api.post('/submission/', {
        problemId: problem.id,
        sourceCode: code,
        languageId: 1, // Python
      });
      // The submission endpoint returns a String status; wrap it
      if (typeof result === 'string') {
        setSubmitResult({ status: result, passed: result === 'ACCEPTED' });
      } else {
        setSubmitResult(result);
      }
    } catch (err) {
      setSubmitResult({ status: 'ERROR', stderr: err.message, passed: false });
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
        <PanelGroup orientation="horizontal" className="panel-group-horizontal">
          {/* ── Left Panel: Problem Description ── */}
          <Panel defaultSize={38} minSize={20} className="solve-left-panel">
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
          </Panel>

          <PanelResizeHandle className="resize-handle-horizontal" />

          {/* ── Right Panel: Code Editor + Console ── */}
          <Panel defaultSize={62} minSize={30} className="solve-right-panel">
            <PanelGroup orientation="vertical" className="panel-group-vertical">
              {/* ── Editor Pane ── */}
              <Panel defaultSize={65} minSize={20} className="editor-pane">
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
                  <Editor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace",
                      minimap: { enabled: false },
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      tabSize: 4,
                      lineNumbersMinChars: 3,
                      cursorBlinking: "smooth",
                      cursorSmoothCaretAnimation: "on",
                      scrollbar: {
                        vertical: "visible",
                        horizontal: "visible",
                        useShadows: false,
                        verticalHasArrows: false,
                        horizontalHasArrows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10
                      }
                    }}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="resize-handle-vertical" />

              {/* ── Console / Test Cases ── */}
              <Panel defaultSize={35} minSize={10} className="console-pane">
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
                          {running ? `Running ${testCases.length} test case${testCases.length > 1 ? 's' : ''}…` : 'Submitting…'}
                        </div>
                      ) : runResults.length > 0 ? (
                        /* ── Per-case Run Results ── */
                        <div>
                          {/* Summary line */}
                          <div style={{ marginBottom: 12 }}>
                            {runResults.every((r) => r.passed) ? (
                              <span className="result-accepted" style={{ fontSize: 18 }}>✓ All Test Cases Passed</span>
                            ) : (
                              <span className="result-wrong" style={{ fontSize: 18 }}>
                                ✗ {runResults.filter((r) => r.passed).length}/{runResults.length} Test Cases Passed
                              </span>
                            )}
                          </div>

                          {/* Per-case tabs */}
                          <div className="testcase-tabs">
                            {runResults.map((r, idx) => (
                              <button
                                key={idx}
                                className={`testcase-tab ${activeResultCase === idx ? 'active' : ''}`}
                                onClick={() => setActiveResultCase(idx)}
                                style={{
                                  borderLeft: `3px solid ${r.passed ? '#4ade80' : '#ef4444'}`,
                                  color: activeResultCase === idx
                                    ? '#e5e2e3'
                                    : r.passed ? '#4ade80' : '#ef4444',
                                }}
                              >
                                {r.passed ? '✓' : '✗'} Case {idx + 1}
                              </button>
                            ))}
                          </div>

                          {/* Selected case details */}
                          {runResults[activeResultCase] && (() => {
                            const r = runResults[activeResultCase];
                            return (
                              <div style={{ marginTop: 12 }}>
                                <div className={getStatusClass(r.status)} style={{ fontSize: 16 }}>
                                  {getStatusLabel(r.status)}
                                </div>

                                {/* Execution stats */}
                                {(r.executionTimeMs != null || r.memoryUsageKb != null) && (
                                  <div className="result-stats">
                                    {r.executionTimeMs != null && (
                                      <span>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>timer</span>
                                        {r.executionTimeMs} ms
                                      </span>
                                    )}
                                    {r.memoryUsageKb != null && (
                                      <span>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>memory</span>
                                        {(r.memoryUsageKb / 1024).toFixed(1)} MB
                                      </span>
                                    )}
                                  </div>
                                )}

                                {/* Input */}
                                {testCases[activeResultCase] && (
                                  <div className="result-detail">
                                    <div className="result-label">Input:</div>
                                    <div className="result-value">{testCases[activeResultCase].input}</div>
                                  </div>
                                )}

                                {/* Wrong answer: show expected vs actual */}
                                {r.status === 'WRONG_ANSWER' && (
                                  <div className="result-detail">
                                    <div className="result-label">Expected Output:</div>
                                    <div className="result-value">{r.expectedOutput}</div>
                                    <div className="result-label">Your Output:</div>
                                    <div className="result-value">{r.actualOutput}</div>
                                  </div>
                                )}

                                {/* Accepted: show output */}
                                {r.status === 'ACCEPTED' && r.stdout && (
                                  <div className="result-detail">
                                    <div className="result-label">Output:</div>
                                    <div className="result-value">{r.stdout}</div>
                                  </div>
                                )}

                                {/* Stderr */}
                                {r.stderr && (
                                  <div className="result-detail">
                                    <div className="result-label">Error:</div>
                                    <div className="result-value" style={{ color: '#ef4444' }}>{r.stderr}</div>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      ) : submitResult ? (
                        /* ── Submit Result (single) ── */
                        <div>
                          <div className={getStatusClass(submitResult.status)} style={{ fontSize: 18 }}>
                            {getStatusLabel(submitResult.status)}
                          </div>
                          {submitResult.stderr && (
                            <div className="result-detail">
                              <div className="result-label">Error:</div>
                              <div className="result-value" style={{ color: '#ef4444' }}>{submitResult.stderr}</div>
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
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
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
