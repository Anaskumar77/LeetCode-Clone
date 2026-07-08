import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 px-margin-desktop py-4 flex justify-between items-center w-full">
      {/* Search Bar */}
      <div className="relative w-full max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="text-on-surface-variant group-focus-within:text-primary-fixed-dim transition-colors" />
        </div>
        <input className="block w-full pl-12 pr-4 py-3 bg-surface-container border border-surface-variant rounded-full text-on-surface placeholder-on-surface-variant focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim focus:outline-none transition-all shadow-inner font-body-md text-body-md" placeholder="Search problems, topics, or contests..." type="text" />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-surface-variant text-on-surface-variant font-label-sm text-[10px] border border-white/5">⌘K</span>
        </div>
      </div>
      {/* Trailing Actions */}
      <div className="flex items-center gap-4 ml-4">
        <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors relative border border-white/5">
          <NotificationsIcon />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-fixed-dim rounded-full shadow-[0_0_8px_rgba(206,189,255,0.8)]"></span>
        </button>
        <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-secondary-fixed hover:bg-surface-variant transition-colors border border-white/5">
          <WorkspacePremiumIcon />
        </button>
        <div className="h-10 w-10 rounded-full bg-surface-container border-2 border-secondary overflow-hidden ml-2 cursor-pointer relative shadow-[0_0_10px_rgba(189,199,217,0.3)]">
          <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAcCQ_dCAmnP9TUR107D0CLN87f48PX4UnMsBucRUgQl6BoGw8ApZnJSGOqN4OqAZT-K39wrKEtw2JI0zgDlZvmBXcdZh9pMegO2pw5c4YPjuCKYXF-wpbByFxG_VEPCjcpOvezL1Btb1IGIo6P517fFpSPdBHuy_S9U-Tl1WkJXDMRtdvuJLLr02C0o1y9-D8xC42NyATarAB4gcb0GR3zMMmJMxmXtDWKmLatCrhylRx-bp8XycZsxNOHbuLR4G76l-3IBsAGRB5" />
        </div>
      </div>
    </header>
  );
}
