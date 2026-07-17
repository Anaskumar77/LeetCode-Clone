import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useState, useEffect } from 'react';
import ActivityHeatmap from '../../../../components/ActivityHeatmap/ActivityHeatmap';

export default function StatsSidebar() {
  const [calendarData, setCalendarData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(14); // dummy fallback

  useEffect(() => {
    // Fetch data for the streak calendar. Using a dummy UUID for now.
    const dummyUserId = '00000000-0000-0000-0000-000000000000';
    fetch(`/api/submission/calendar/${dummyUserId}`)
      .then(res => {
         if (res.ok) return res.json();
         throw new Error("Failed to fetch");
      })
      .then(data => {
        if (data && data.days) {
          setCalendarData(data.days);
          setCurrentStreak(data.currentStreak);
        }
      })
      .catch(err => console.error("Error fetching calendar data:", err));
  }, []);
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      {/* Profile / Progress Card */}
      <div className="glass-panel border border-white/5 rounded-DEFAULT p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-[40px] rounded-full pointer-events-none"></div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-surface-variant border-2 border-primary overflow-hidden">
              <img className="w-full h-full object-cover" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl2dUfX8EquSuvUfOJ1onaP3zjuXmCWI2wGFYZC65tWJajIBT--YvE5ZAnCYVTMDJDeAVb6a_a0zvvTntzsw4Sgsrin2SaYOLaXaWs973ekBS8JObQ-bsiM_PyFSkpuOWQYhsE6zuDyHTQuS0gA4m0fvGnnRm0uy266UNbzzlpVFPs8Pd3ywckibEhkHGgJcD2sq_y1BgxJc9Cz-OisVUStSS7I-nlbBJbWnfg540X-VEQfwEjgI42ksVm2cwJcw1b3UG77ERk_np_" />
            </div>
            <div>
              <h3 className="font-body-lg text-body-lg text-on-surface font-bold">Darlene R.</h3>
              <p className="font-label-sm text-label-sm text-secondary-fixed-dim">Level 42 &bull; Knight</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors">
            <OpenInNewIcon className="text-[16px]" />
          </button>
        </div>
        {/* Progress Stats */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Solved Problems</p>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-primary tracking-tight">482</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/ 3045</span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 rounded-sm bg-primary-container/20 text-primary font-label-sm text-label-sm border border-primary/30">+12 this week</span>
          </div>
        </div>
        {/* Segmented Progress Bar */}
        <div className="w-full h-2 flex rounded-full overflow-hidden mt-4 bg-surface-variant">
          <div className="bg-primary h-full" style={{ width: '45%' }}></div>
          <div className="bg-secondary h-full" style={{ width: '30%' }}></div>
          <div className="bg-error h-full" style={{ width: '10%' }}></div>
        </div>
        {/* Legend */}
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-center">
            <span className="text-primary font-label-sm text-label-sm mb-1">Easy</span>
            <span className="font-body-md text-body-md text-on-surface font-medium">215</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-secondary font-label-sm text-label-sm mb-1">Medium</span>
            <span className="font-body-md text-body-md text-on-surface font-medium">210</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-error font-label-sm text-label-sm mb-1">Hard</span>
            <span className="font-body-md text-body-md text-on-surface font-medium">57</span>
          </div>
        </div>
      </div>
      {/* Streak Calendar Card */}
      <div className="glass-panel rounded-DEFAULT p-6 border border-white/5 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-body-md text-body-md text-on-surface font-medium flex items-center gap-2">
            <LocalFireDepartmentIcon className="text-primary text-[18px]" />
            Activity Streak
          </h3>
          <div className="bg-surface-variant px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary font-bold">{currentStreak} Days</span>
          </div>
        </div>
        {/* Minimalist Calendar Heatmap Representation */}
        <ActivityHeatmap days={21} data={calendarData} />
      </div>
      {/* Discussion Highlights */}
      <div className="glass-panel rounded-DEFAULT p-6 border border-white/5 shadow-md flex-1">
        <h3 className="font-body-md text-body-md text-on-surface font-medium mb-4 flex items-center gap-2">
          <ForumIcon className="text-[18px] text-secondary" />
          Trending Discussions
        </h3>
        <div className="flex flex-col gap-4">
          <div className="group cursor-pointer">
            <p className="font-body-md text-[14px] text-on-surface group-hover:text-primary transition-colors line-clamp-2">O(n) Time / O(1) Space solution for Longest Palindrome using Expand Around Center</p>
            <div className="flex items-center gap-3 mt-1 text-on-surface-variant font-label-sm text-[10px]">
              <span className="flex items-center gap-1"><ThumbUpIcon className="text-[12px]" /> 245</span>
              <span className="flex items-center gap-1"><ChatBubbleIcon className="text-[12px]" /> 42</span>
            </div>
          </div>
          <div className="h-px w-full bg-white/5"></div>
          <div className="group cursor-pointer">
            <p className="font-body-md text-[14px] text-on-surface group-hover:text-primary transition-colors line-clamp-2">Why DP is overkill for this problem: A detailed explanation.</p>
            <div className="flex items-center gap-3 mt-1 text-on-surface-variant font-label-sm text-[10px]">
              <span className="flex items-center gap-1"><ThumbUpIcon className="text-[12px]" /> 189</span>
              <span className="flex items-center gap-1"><ChatBubbleIcon className="text-[12px]" /> 18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
