import { ShieldAlert } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-primary">
      <div className="flex max-w-3xl flex-col items-center space-y-8 text-center">
        <h1 className="text-5xl font-bold dark:text-quaternary sm:text-6xl">
          Welcome to <span className="text-green-600">Safe Spoon</span>
        </h1>
        <p className="text-lg dark:text-quaternary sm:text-xl">
          Safeguard your meals by checking ingredients based on your health
          factors.
        </p>

        <div className="flex h-72 w-full items-center justify-center rounded-lg border border-border bg-secondary sm:h-80">
          <video
            className="h-full min-w-full"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-placeholder.png"
            src="/hero.mp4"
          ></video>
        </div>

        <div className="flex items-center space-x-2 text-[#8b949e]">
          <ShieldAlert className="h-5 w-5 text-[#8b949e]" />
          <p>
            Get personalized safety recommendations based on your health
            profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
