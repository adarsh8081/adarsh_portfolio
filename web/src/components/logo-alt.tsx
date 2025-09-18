export function LogoAlt() {
  return (
    <div className="flex items-center space-x-4">
      {/* Tech Company Style Icon */}
      <div className="relative w-12 h-12">
        {/* Main geometric shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 rounded-lg transform rotate-12 shadow-xl"></div>
        
        {/* AI/ML Symbolic Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Central A with tech styling */}
            <div className="text-white font-black text-lg relative z-10 tracking-tight">A</div>
            
            {/* Circuit board inspired elements */}
            <div className="absolute -top-2 -right-2 w-3 h-0.5 bg-cyan-400 transform rotate-45"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-0.5 bg-emerald-400 transform -rotate-45"></div>
            <div className="absolute top-1 -left-3 w-1 h-1 bg-yellow-400 rounded-sm"></div>
            <div className="absolute -bottom-1 -right-3 w-1 h-1 bg-pink-400 rounded-sm"></div>
            
            {/* Data flow lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-2 left-2 w-6 h-0.5 bg-gradient-to-r from-cyan-400 via-transparent to-blue-400 opacity-70"></div>
              <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-gradient-to-r from-emerald-400 via-transparent to-cyan-400 opacity-70"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-lg border border-cyan-400/30"></div>
      </div>
      
      {/* Professional Text Layout */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Adarsh Kumar
          </span>
          {/* Status indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">AI/ML Engineer</span>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
            <span className="text-xs text-slate-500 dark:text-slate-500 ml-1">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-500">Creative Professional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
