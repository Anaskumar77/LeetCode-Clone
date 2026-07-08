import NavBar from '../../components/NavBar/NavBar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import FeaturedCards from './components/FeaturedCards/FeaturedCards';
import ProblemsTable from './components/ProblemsTable/ProblemsTable';
import StatsSidebar from './components/StatsSidebar/StatsSidebar';

export default function ProblemSet() {
  return (
    <>
      <LeftSidebar />
      <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-y-auto bg-background relative transition-all">
        <NavBar />
        <div className="flex-1 p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-7xl mx-auto w-full">
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <FeaturedCards />
            <ProblemsTable />
          </div>
          <StatsSidebar />
        </div>
      </main>
    </>
  );
}
