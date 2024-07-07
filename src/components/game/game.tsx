import classes from "@/styles/game.module.css";
import { cn } from "@/lib/utils";

export const Game = () => {
  return (
    <div className={classes.camera}>
      <div className={cn(classes.map, classes.pixelArt)}>
        {/* <div className={classes.character} data-facing="down" data-walking="true">
          <div className={cn(classes.shadow, classes.pixelArt)}></div>
          <div className={cn(classes.characterSpritesheet, classes.pixelArt)}></div>
        </div> */}
      </div>
    </div>
  );
};
