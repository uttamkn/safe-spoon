const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="text-3xl font-bold text-green-600">Loading</div>

      <div className="flex space-x-1">
        <div className="h-3 w-3 animate-bounce rounded-full bg-green-600"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-green-600 delay-200"></div>
        <div className="delay-400 h-3 w-3 animate-bounce rounded-full bg-green-600"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
