import { Game } from "@/components/game";

export const Gameboy = () => {
  return (
    <div className="col-span-4 mx-auto flex max-h-[88vh] w-full flex-col bg-dark-blue p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="size-8 rounded-full bg-light-blue"></div>
        <div className="text-white">Our/Story</div>
        <div className="size-8 rounded-full bg-light-blue"></div>
      </div>
      <div className="relative z-10 grow overflow-hidden bg-black">
        <Game />
      </div>
      <div className="mt-5 flex justify-between text-xs text-white">
        <div>
          <p>
            <span className="mr-1">⬅️</span> + <span className="ml-1">➡️</span>{" "}
            to move
          </p>
        </div>
        <div>SPACE to interact</div>
      </div>
    </div>
  );
};
