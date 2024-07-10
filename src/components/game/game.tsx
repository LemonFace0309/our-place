"use client";

import { useEffect, useRef } from "react";

import classes from "@/styles/game.module.css";
import { COLLISIONS } from "@/lib/collisions";
import { cn } from "@/lib/utils";

const speed = 0.75;
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

      let new_x = x.current;
      let new_y = y.current;

      const held_direction = held_directions.current[0];
      if (held_direction) {
        if (held_direction === directions.right) {
          new_x += speed;
        }
        if (held_direction === directions.left) {
          new_x -= speed;
        }
        if (held_direction === directions.down) {
          new_y += speed;
        }
        if (held_direction === directions.up) {
          new_y -= speed;
        }
        character.current.setAttribute("data-facing", held_direction);
      }
      character.current.setAttribute(
        "data-walking",
        held_direction ? "true" : "false",
      );

      // Collisions
      // +2.01 on instead of +0.01 to allow character to pass through small corridors
      const x_cord_top_left = Math.floor((new_x + 2.01) / 16); 
      const y_cord_top_left = Math.floor((new_y + 2.01) / 16);
      const x_cort_top_right = Math.floor((new_x + 15.99) / 16);
      const y_cord_top_right = Math.floor((new_y + 2.01) / 16);
      const x_cord_bottom_left = Math.floor((new_x + 2.01) / 16);
      const y_cord_bottom_left = Math.floor((new_y + 15.99) / 16);
      const x_cord_bottom_right = Math.floor((new_x + 15.99) / 16);
      const y_cord_bottom_right = Math.floor((new_y + 15.99) / 16);


      const is_collision =
        COLLISIONS[y_cord_top_left][x_cord_top_left] === 1 ||
        COLLISIONS[y_cord_top_right][x_cort_top_right] === 1 ||
        COLLISIONS[y_cord_bottom_left][x_cord_bottom_left] === 1 ||
        COLLISIONS[y_cord_bottom_right][x_cord_bottom_right] === 1;
      if (!is_collision) {
        x.current = new_x;
        y.current = new_y;
      }

      const camera_left = camera.current.offsetWidth / 2 - 8;
      const camera_top = camera.current.offsetHeight / 2 - 8;

      map.current.style.transform = `translate3d( ${-x.current * pixelSize + camera_left}px, ${-y.current * pixelSize + camera_top}px, 0 )`;
      character.current.style.transform = `translate3d(${x.current * pixelSize}px, ${y.current * pixelSize}px, 0 )`;
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
