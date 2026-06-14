import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../../../../store/slices/problemsSlice';
import './ProblemsTable.css';

export default function ProblemsTable() {
  const dispatch = useDispatch();
  const { list: problems, loading, error } = useSelector((state) => state.problems);

  useEffect(() => {
    dispatch(fetchProblems({ page: 0, count: 10 }));
  }, [dispatch]);

  return (
    <section className="lc-section lc-section-problems" id="problems-list">
      <div className="lc-section-label">Problems</div>

      {/* Topic Tags Row */}
      <div className="lc-topic-tags">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="wf-topic-tag" />
        ))}
        <div className="wf-expand-btn" />
      </div>

      {/* Filter Tabs */}
      <div className="lc-filter-tabs">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`wf-tab ${i === 0 ? 'wf-tab-active' : ''}`} />
        ))}
        <div className="wf-tab-more" />
      </div>

      {/* Search + Controls Row */}
      <div className="lc-controls-row">
        <div className="wf-search-bar wf-search-problems" />
        <div className="wf-sort-btn" />
        <div className="wf-filter-btn" />
        <div className="lc-controls-right">
          <div className="wf-solved-count" />
          <div className="wf-icon-xs" />
        </div>
      </div>

      {/* Problems Table */}
      <div className="lc-table">
        {/* Header */}
        <div className="lc-table-header">
          <div className="wf-col wf-col-status" />
          <div className="wf-col wf-col-title" />
          <div className="wf-col wf-col-acc" />
          <div className="wf-col wf-col-diff" />
          <div className="wf-col wf-col-lock" />
          <div className="wf-col wf-col-fav" />
        </div>

        {/* Rows */}
        {loading && <div className="lc-table-row" style={{ padding: '20px', color: 'var(--text)' }}>Loading problems...</div>}
        {error && <div className="lc-table-row" style={{ padding: '20px', color: 'red' }}>Error: {error}</div>}
        {!loading && !error && problems.length === 0 && (
          <div className="lc-table-row" style={{ padding: '20px', color: 'var(--text)' }}>No problems found.</div>
        )}
        {!loading && !error && problems.map((problem) => (
          <div key={problem.id} className="lc-table-row">
            <div className="wf-col wf-col-status">
              <div className="wf-status-dot" />
            </div>
            <div className="wf-col wf-col-title">
              <span style={{ color: 'var(--text)', cursor: 'pointer' }}>{problem.title}</span>
            </div>
            <div className="wf-col wf-col-acc">
              <span style={{ color: 'var(--text)', fontSize: '14px' }}>
                {problem.acceptanceRate ? `${problem.acceptanceRate}%` : '-'}
              </span>
            </div>
            <div className="wf-col wf-col-diff">
              <span style={{ 
                color: problem.difficulty === 'Easy' ? '#00b8a3' : problem.difficulty === 'Medium' ? '#ffc01e' : '#ff375f',
                fontSize: '14px'
              }}>
                {problem.difficulty}
              </span>
            </div>
            <div className="wf-col wf-col-lock">
            </div>
            <div className="wf-col wf-col-fav">
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
