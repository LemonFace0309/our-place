export const Cartridge = ({ label }: { label: string }) => {
  return (
    <div className="relative mx-auto h-40 flex-1 rounded-xl bg-dark-gray p-5 shadow-inset">
      <div className="flex h-36 w-full items-center justify-center rounded-lg bg-light-gray">
        <span className="font-mono text-sm text-white">{label}</span>
      </div>
    </div>
  );
};
