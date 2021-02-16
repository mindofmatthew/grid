import React from "react";
import { Puzzle } from "./types";
import css from "./Grid.module.css";

export function Grid({ puzzle }: { puzzle: Puzzle }) {
  return (
    <table className={css.grid}>
      <tbody>
        {puzzle.grid.map((row, i) => (
          <tr key={i}>
            {row.map((c, j) => (
              <td
                key={j}
                style={{ background: c.isBlack ? "black" : "white" }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
