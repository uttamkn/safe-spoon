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
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2toYW9kenVsODBmN3F0Z20yZTZpYXloNGc3NWZ6OHFtbXM4amt4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btY4sTRahDC5M2I/giphy.webp"
            alt="Lost astronaut animation"
            className="h-64 rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
