import { Button } from "./ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white text-gray-900 dark:bg-primary dark:text-white">
      <div className="p-6 text-center">
        <h1 className="mb-4 animate-pulse text-6xl font-bold">404</h1>
        <p className="mb-6 text-xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Button onClick={() => window.location.replace("/")} variant="green">
          Go back to Homepage
        </Button>

        <div className="mt-8 flex justify-center">
          <img
            src="lostZoro.jpg"
            alt="Lost zoro"
            className="h-full w-96 rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
