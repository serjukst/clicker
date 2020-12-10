export interface User {
  name: string;
}

export interface Game {
  clicks: number;
  state: string;
  timer: number;
  initialTimer: number;
  isStarted: boolean;
  isOver: boolean;
}
