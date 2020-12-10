import { Game } from './../interfaces';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

Injectable();
export class GameService {
  intervalStream$ = interval(1000);
  sub: Subscription;

  playGame(game: Game) {
    game.state = 'Click to count';

    if (game.isStarted) {
      game.clicks++;
    } else {
      this.sub = this.intervalStream$.subscribe(() => {
        game.timer--;
        if (game.timer === 0) {
          this.setRecord(game.initialTimer, game.clicks);
          game.isOver = true;
          game.isStarted = false;
          this.sub.unsubscribe();
        }
      });
    }

    game.isStarted = true;
  }

  resetGame(game: Game) {
    game.timer = game.initialTimer;
    game.clicks = 0;
    game.isOver = false;
    game.isStarted = false;
    game.state = 'Click to start';

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  setRecord(timer: number, clicks: number): void {
    const records: number =
      JSON.parse(localStorage.getItem(`timer_${timer}`)) || 0;

    if (records < clicks) {
      localStorage.setItem(`timer_${timer}`, JSON.stringify(clicks));
    }
  }

  getRecord(timer: number): number {
    return JSON.parse(localStorage.getItem(`timer_${timer}`)) || 0;
  }
}
