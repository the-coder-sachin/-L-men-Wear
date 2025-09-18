const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full p-12">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
