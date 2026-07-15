import FilterListIcon from '@mui/icons-material/FilterList';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProblems, fetchFavorites, addFavoriteAsync, removeFavoriteAsync } from '../../../../store/slices/problemsSlice';

export default function ProblemsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: problems, loading, favorites } = useSelector((state) => state.problems);

  useEffect(() => {
    dispatch(fetchProblems());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleToggleFavorite = (e, problemId) => {
    e.stopPropagation();
    if (favorites.includes(problemId)) {
      dispatch(removeFavoriteAsync(problemId));
    } else {
      dispatch(addFavoriteAsync(problemId));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY': return 'text-primary-fixed-dim';
      case 'MEDIUM': return 'text-secondary';
      case 'HARD': return 'text-error';
      default: return 'text-on-surface-variant';
    }
  };

  const getDifficultyText = (difficulty) => {
    if (!difficulty) return 'Unknown';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  };

  return (
    <>
      {/* Problem List Filter/Tabs */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 bg-surface-container rounded-full p-1 border border-white/5">
          <button className="shrink-0 bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-body-md text-body-md font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(167,139,250,0.2)]">All</button>
          <button className="shrink-0 text-on-surface-variant px-6 py-2 rounded-full font-body-md text-body-md hover:bg-surface-variant transition-colors">Algorithms</button>
          <button className="shrink-0 text-on-surface-variant px-6 py-2 rounded-full font-body-md text-body-md hover:bg-surface-variant transition-colors">Database</button>
          <button className="shrink-0 text-on-surface-variant px-6 py-2 rounded-full font-body-md text-body-md hover:bg-surface-variant transition-colors">Shell</button>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors border border-white/5">
            <FilterListIcon />
          </button>
          <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors border border-white/5">
            <ShuffleIcon />
          </button>
        </div>
      </div>

      {/* Problem List Table */}
      <div className="flex flex-col gap-2 rounded-xl glass-panel mt-4">
        {/* Header Row */}
        <div className="grid grid-cols-[40px_1fr_100px_100px_40px] gap-4 px-6 py-3 text-on-surface-variant font-label-sm text-label-sm border-b border-white/5">
          <div className="">Status</div>
          <div className="">Title</div>
          <div className="text-center">Difficulty</div>
          <div className="text-right">Acceptance</div>
          <div className="text-center flex justify-center">
            <StarIcon className="text-[16px]" />
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-on-surface-variant font-body-md">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="px-6 py-8 text-center text-on-surface-variant font-body-md">No problems found.</div>
        ) : (
          problems.map((problem, index) => {
            // Generate a deterministic random-looking acceptance rate between 20.0 and 80.0
            const acceptanceRate = ((problem.title.length * 13) % 60 + 20).toFixed(1);

            return (
              <div key={problem.id || index} onClick={() => navigate(`/problem/${problem.id}`)} className="grid grid-cols-[40px_1fr_100px_100px_40px] gap-4 px-6 py-4 bg-surface-container/30 hover:bg-surface-variant/40 items-center transition-colors border-b border-white/5 group cursor-pointer">
                <div className="text-on-surface-variant/30">
                  <RadioButtonUncheckedIcon className="text-[20px]" />
                </div>
                <div>
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                    {index + 1}. {problem.title}
                  </span>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {problem.categories && problem.categories.map((cat, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-surface-variant/50 text-on-surface-variant text-[10px]">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <span className={`${getDifficultyColor(problem.difficulty)} font-label-sm text-label-sm`}>
                    {getDifficultyText(problem.difficulty)}
                  </span>
                </div>
                <div className="text-right font-body-md text-body-md text-on-surface-variant">{acceptanceRate}%</div>
                <div className="text-center flex justify-center">
                  <button
                    onClick={(e) => handleToggleFavorite(e, problem.id)}
                    className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                  >
                    {favorites.includes(problem.id) ? (
                      <StarIcon className="text-primary-fixed-dim text-[20px] hover:scale-110 transition-transform" />
                    ) : (
                      <StarBorderIcon className="text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors text-[20px]" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
