// components/Common/ErrorMessage.jsx

const ErrorMessage = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 border border-red-300 rounded p-4 text-center">
      <p className="text-xl font-semibold mb-2">⚠️ Error</p>
      <p className="text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
