import { Button } from "./ui/button";

export default function Fallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-white text-gray-900 dark:bg-primary dark:text-white">
      <div className="p-6 text-center">
        <h1 className="mb-4 animate-pulse text-6xl font-bold">THIS IS BAD</h1>
        <p className="mb-6 text-xl">
          Something terrible happened. Please go back to the homepage.
        </p>
        <Button onClick={() => window.location.replace("/")} variant="green">
          Go back to Homepage
        </Button>

        <div className="mt-8 flex justify-center">
          <img
            src="https://media.giphy.com/media/26xBI73gWquCBBCDe/giphy.gif"
            alt="Confused animation"
            className="h-64 rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
