import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function FeaturedCards() {
  return (
    <div className="relative glass-panel rounded-DEFAULT p-container-padding border border-white/5 shadow-lg overflow-hidden group">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary-container/20 transition-all duration-500"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-secondary-container/20 transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-white/10">
              <CalendarTodayIcon className="text-[14px]" />
              Today, Oct 24
            </span>
            <span className="px-3 py-1 bg-primary-container/10 text-primary-fixed-dim rounded-full font-label-sm text-label-sm border border-primary-fixed-dim/20">
              Daily Challenge
            </span>
          </div>
          
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">84. Largest Rectangle in Histogram</h2>
          
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl line-clamp-2">
            Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            <span className="text-error font-label-sm text-label-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error"></span> Hard
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
              <GroupIcon className="text-[16px]" /> 42.1% Acceptance
            </span>
          </div>
        </div>
        
        <button className="shrink-0 bg-white text-background px-8 py-4 font-body-lg text-body-lg font-bold flex items-center gap-2 hover:bg-tertiary hover:shadow-[0_0_20px_rgba(206,189,255,0.4)] transition-all duration-300 scale-98 active:scale-95 shadow-[0_0_15px_rgba(206,189,255,0.2)] rounded-full">
          Solve Now
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
}
