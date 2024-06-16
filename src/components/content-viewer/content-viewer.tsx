export const ContentViewer = () => {
  return (
    <div className="relative mx-auto flex size-96 flex-col justify-between rounded-xl bg-very-dark-blue p-5 shadow-inset">
      <div className="text-light-blue">
        <h1 className="text-lg">What is Our/Place?</h1>
        <p className="mt-2 text-sm text-white">
          Where you live is the most important decision to make in your 20s. So
          we made home where our homies are. Homies are the friends you learn
          and laugh the most with. They&apos;re the friends who inspire you to
          live with intensity and authenticity. We live vicariously through the
          homies at Our/Place.
        </p>
      </div>
      <div className="flex items-center justify-between text-white">
        <button className="flex size-8 items-center justify-center rounded-full bg-light-blue">
          <span>⟵</span>
        </button>
        <button className="flex size-8 items-center justify-center rounded-full bg-light-blue">
          <span>⟶</span>
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="size-2 rounded-full bg-light-blue"></div>
        <div className="size-2 rounded-full bg-light-blue"></div>
        <div className="size-2 rounded-full bg-light-blue"></div>
      </div>
    </div>
  );
};
