import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import StormIcon from '@mui/icons-material/Storm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import BoltIcon from '@mui/icons-material/Bolt';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LeftSidebar() {
  return (
    <nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container shadow-xl border-r border-white/5 flex flex-col p-6 gap-unit z-50 transition-all duration-300 hidden md:flex rounded-DEFAULT">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3 min-h-[3rem]">
        <button className="p-2 hover:bg-surface-variant/30 rounded-full transition-colors text-on-surface-variant hover:text-primary shrink-0">
          <MenuOpenIcon />
        </button>
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container glow-effect inner-glow shrink-0">
          <StormIcon />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl text-primary m-0 tracking-tight font-bold truncate py-1">CodeStorm</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant truncate">Premium Tier</p>
        </div>
      </div>
      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-2">
        <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <DashboardIcon className="text-[20px] group-hover:text-primary transition-colors" />
          <span className="font-body-md text-body-md font-medium">Dashboard</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(167,139,250,0.15)] translate-x-1 duration-200 rounded-full overflow-hidden" href="#">
          <CodeIcon className="text-[20px]" />
          <span className="font-body-md text-body-md">Problems</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <HistoryIcon className="text-[20px] group-hover:text-primary transition-colors" />
          <span className="font-body-md text-body-md font-medium">Submissions</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <BarChartIcon className="text-[20px] group-hover:text-primary transition-colors" />
          <span className="font-body-md text-body-md font-medium">Analytics</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <SettingsIcon className="text-[20px] group-hover:text-primary transition-colors" />
          <span className="font-body-md text-body-md font-medium">Settings</span>
        </a>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <h3 className="px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Favorites</h3>
        <a className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <StarIcon className="text-[18px] text-primary-fixed-dim" />
          <span className="font-body-md text-[14px]">Two Sum</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <StarIcon className="text-[18px]" />
          <span className="font-body-md text-[14px]">Reverse Integer</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-surface-variant/30 transition-all duration-200 group rounded-full overflow-hidden" href="#">
          <StarIcon className="text-[18px]" />
          <span className="font-body-md text-[14px]">LRU Cache</span>
        </a>
      </div>
      {/* CTA & Footer */}
      <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-white/5">
        <button className="w-full py-3 bg-gradient-to-br from-inverse-primary to-primary-container text-white font-label-sm text-label-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity border border-white/10 shadow-sm flex items-center justify-center gap-2 glow-effect rounded-full">
          <BoltIcon className="text-[16px]" />Upgrade to Pro
        </button>
        <div className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm overflow-hidden" href="#">
            <HelpIcon className="text-[18px]" />
            Help
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-error transition-colors font-label-sm text-label-sm overflow-hidden" href="#">
            <LogoutIcon className="text-[18px]" />
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
