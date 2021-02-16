interface Word {
  cells: number[];
  clue: string | null;
  len: number;
}

export interface Puzzle {
  author: string;
  clues: string[];
  copyright: string;
  grid: Array<
    Array<{
      across: Word;
      down: Word;
      cell: number;
      clueIndex: number;
      isBlack: boolean;
      isStart: boolean;
    }>
  >;
  header: unknown;
  solution: number[];
  title: string;
  valid: boolean;
}
