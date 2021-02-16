interface Word {
  cells: number[];
  clue: string | null;
  len: number;
}

export interface CellData {
  across: Word;
  down: Word;
  cell: number;
  clueIndex: number;
  isBlack: boolean;
  isStart: boolean;
}

export interface Puzzle {
  author: string;
  clues: string[];
  copyright: string;
  grid: CellData[][];
  header: unknown;
  solution: number[];
  title: string;
  valid: boolean;
}
