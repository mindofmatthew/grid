import React, { useEffect, useRef, useState } from "react";
import { CellData, Puzzle } from "./types";
import css from "./Grid.module.css";

export function Grid({ puzzle }: { puzzle: Puzzle }) {
  const [current, setCurrent] = useState<[number, number]>([0, 0]);

  const height = puzzle.grid.length;
  const width = puzzle.grid[0].length;

  function applyIncrement(increment: [-1 | 0 | 1, -1 | 0 | 1]) {
    setCurrent((current) => {
      let lastGoodPosition = current;
      while (true) {
        current = [current[0] + increment[0], current[1] + increment[1]];
        if (
          current[0] == -1 ||
          current[0] == height ||
          current[1] == -1 ||
          current[1] == width
        ) {
          break;
        }
        if (!puzzle.grid[current[0]][current[1]]?.isBlack) {
          lastGoodPosition = current;
          break;
        }
      }
      return lastGoodPosition;
    });
  }

  return (
    <table className={css.grid} cellSpacing={0}>
      <tbody>
        {puzzle.grid.map((row, i) => (
          <tr key={i}>
            {row.map((data, j) => (
              <Cell
                current={i === current[0] && j === current[1]}
                onClick={() => {
                  setCurrent([i, j]);
                }}
                onArrowLeft={() => {
                  applyIncrement([0, -1]);
                }}
                onArrowRight={() => {
                  applyIncrement([0, +1]);
                }}
                onArrowUp={() => {
                  applyIncrement([-1, 0]);
                }}
                onArrowDown={() => {
                  applyIncrement([+1, 0]);
                }}
                data={data}
                key={j}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Cell({
  data,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onArrowDown,
  onClick,
  current,
}: {
  data: CellData;
  onArrowLeft: () => void;
  onArrowRight: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
  onClick: () => void;
  current: boolean;
}) {
  const cellRef = useRef<HTMLTableDataCellElement>(null);

  useEffect(() => {
    if (current) cellRef.current?.focus();
  }, [current]);

  return (
    <td
      ref={cellRef}
      tabIndex={0}
      onKeyUp={(e) => {
        switch (e.key) {
          case "ArrowLeft":
            onArrowLeft();
            break;
          case "ArrowRight":
            onArrowRight();
            break;
          case "ArrowUp":
            onArrowUp();
            break;
          case "ArrowDown":
            onArrowDown();
            break;
        }
      }}
      onClick={(e) => {
        if (e.button === 0 && !data.isBlack) {
          onClick();
        }
      }}
      style={{
        background: current ? "yellow" : data.isBlack ? "black" : "white",
      }}
    ></td>
  );
}
