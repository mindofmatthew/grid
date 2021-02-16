import parse from "@dylanarmstrong/puz";
import React, { useState } from "react";
import { Grid } from "./Grid";
import { Puzzle } from "./types";

export function App() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  return (
    <>
      {puzzle ? (
        <Grid puzzle={puzzle} />
      ) : (
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files![0];
            if (!file) return;
            const contents = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.addEventListener("load", (e) => {
                resolve(new Uint8Array(e.target!.result as ArrayBufferLike));
              });
              reader.addEventListener("error", () => {
                reject(new Error("file read failed"));
              });
              reader.readAsArrayBuffer(file);
            });
            setPuzzle(parse(contents));
          }}
        />
      )}
    </>
  );
}
