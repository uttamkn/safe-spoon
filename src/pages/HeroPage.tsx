const HeroPage = () => {
  return (
    <div className="flex min-h-full items-center justify-center p-6 font-jet-brains-mono dark:bg-primary">
      <div className="flex max-w-3xl flex-col items-center space-y-8 text-center">
        <h1 className="text-5xl font-bold dark:text-quaternary sm:text-6xl">
          Welcome to <span className="text-green-600">Safe Spoon</span>
        </h1>
        <p className="font-roboto text-lg dark:text-quaternary sm:text-xl">
          Safeguard your meals by checking ingredients based on your health
          factors.
        </p>

        <video
          className="h-full min-w-full rounded-lg border dark:border-border"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-placeholder.png"
          src="/hero.mp4"
        ></video>
      </div>
    </div>
  );
};

export default HeroPage;
