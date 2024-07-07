"use client";

import { useEffect, useRef } from "react";

import classes from "@/styles/game.module.css";
import { cn } from "@/lib/utils";

const speed = 1;
const directions = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

export const Game = () => {
  const map = useRef<HTMLDivElement>(null);
  const character = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const held_directions = useRef<string[]>([]);
  const x = useRef(500);
  const y = useRef(500);

  useEffect(() => {
    const placeCharacter = () => {
      if (!map.current || !character.current || !camera.current) return;

      const pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--pixel-size",
        ),
      );

      const held_direction = held_directions.current[0];
      if (held_direction) {
        if (held_direction === directions.right) {
          x.current += speed;
        }
        if (held_direction === directions.left) {
          x.current -= speed;
        }
        if (held_direction === directions.down) {
          y.current += speed;
        }
        if (held_direction === directions.up) {
          y.current -= speed;
        }
        character.current.setAttribute("data-facing", held_direction);
      }
      character.current.setAttribute(
        "data-walking",
        held_direction ? "true" : "false",
      );

      //Limits (gives the illusion of walls)
      // var leftLimit = -8;
      // var rightLimit = 16 * 11 + 8;
      // var topLimit = -8 + 32;
      // var bottomLimit = 16 * 7;
      // if (x.current < leftLimit) {
      //   x.current = leftLimit;
      // }
      // if (x.current > rightLimit) {
      //   x.current = rightLimit;
      // }
      // if (y.current < topLimit) {
      //   y.current = topLimit;
      // }
      // if (y.current > bottomLimit) {
      //   y.current = bottomLimit;
      // }

      // const camera_left = pixelSize * -360;
      // const camera_top = pixelSize * -460;
      const camera_left = camera.current.offsetWidth / 2 - 8;
      const camera_top = camera.current.offsetHeight / 2 - 8;

      map.current.style.transform = `translate3d( ${-x.current * pixelSize + camera_left}px, ${-y.current * pixelSize + camera_top}px, 0 )`;
      character.current.style.transform = `translate3d( ${x.current * pixelSize}px, ${y.current * pixelSize}px, 0 )`;
    };

    //Set up the game loop
    const step = () => {
      placeCharacter();
      window.requestAnimationFrame(() => {
        step();
      });
    };
    step();

    /* Direction key state */
    document.addEventListener("keydown", (e) => {
      if (e.key && held_directions.current.indexOf(e.key) === -1) {
        held_directions.current.unshift(e.key);
      }
    });

    document.addEventListener("keyup", (e) => {
      const index = held_directions.current.indexOf(e.key);
      if (index > -1) {
        held_directions.current.splice(index, 1);
      }
    });
  }, []);

  return (
    <div className={classes.camera} ref={camera}>
      <div className={cn(classes.map, classes.pixelArt)} ref={map}>
        <div
          className={classes.character}
          data-facing="down"
          data-walking="true"
          ref={character}
        >
          <div className={cn(classes.characterSprite, classes.pixelArt)}></div>
        </div>
      </div>
    </div>
  );
};
