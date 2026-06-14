import './ProblemSet.css';

import NavBar         from '../../components/NavBar/NavBar';
import LeftSidebar    from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar   from '../../components/RightSidebar/RightSidebar';
import FeaturedCards  from './components/FeaturedCards/FeaturedCards';
import ProblemsTable  from './components/ProblemsTable/ProblemsTable';
import FutureFeature  from './components/FutureFeature/FutureFeature';

export default function ProblemSet() {
  return (
    <div className="lc-root">

      {/* ── Top Navbar ── */}
      <NavBar />

      {/* ── Body: Left + Main + Right ── */}
      <div className="lc-body">

        <LeftSidebar />

        <main className="lc-main">
          <FeaturedCards />
          <ProblemsTable />
          <FutureFeature />
        </main>

        <RightSidebar />

      </div>
    </div>
  );
}
