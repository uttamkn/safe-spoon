const HeroPage = () => {
  return (
    <div className="flex min-h-full items-center justify-center p-6 font-jet-brains-mono dark:bg-primary">
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
      </div>
    </div>
  );
};

export default HeroPage;
