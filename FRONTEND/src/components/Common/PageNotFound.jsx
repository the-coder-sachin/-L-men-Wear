import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-black hover:bg-black/90 active:scale-90 cursor-pointer text-white px-6 py-2 rounded-md transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
