export function Logo() {
  return (
    <div className="flex items-center space-x-4">
      {/* Sophisticated Icon with Symbolic Elements */}
      <div className="relative w-12 h-12">
        {/* Main container with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl transform rotate-3 shadow-lg"></div>
        
        {/* AI/ML Symbolic Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Neural network inspired design */}
          <div className="relative">
            {/* Central A */}
            <div className="text-white font-bold text-lg relative z-10">A</div>
            
            {/* Neural network nodes */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
            <div className="absolute top-0 -left-2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-200"></div>
            
            {/* Connection lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1 left-1 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 transform rotate-45"></div>
              <div className="absolute bottom-1 right-1 w-3 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-60 transform -rotate-45"></div>
            </div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl blur-sm"></div>
      </div>
      
      {/* Enhanced Text with Styling */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Adarsh Kumar
          </span>
          {/* Tech indicator */}
          <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">AI/ML Engineer</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
