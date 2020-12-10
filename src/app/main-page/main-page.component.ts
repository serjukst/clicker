import { Router } from '@angular/router';
import { User, Game } from './../shared/interfaces';
import { GameService } from './../shared/services/game.service';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    timer: new FormControl('5'),
  });

  timer: number = +this.form.controls.timer.value;

  game: Game = {
    clicks: 0,
    state: 'Click to start',
    timer: this.timer,
    isOver: false,
    isStarted: false,
    initialTimer: this.timer,
  };

  user: User;
  record: number = 0;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.record = this.gameService.getRecord(this.timer);
  }

  playGame(): void {
    this.gameService.playGame(this.game);
    this.form.controls.timer.disable();
  }

  resetGame(): void {
    this.gameService.resetGame(this.game);
    this.record = this.gameService.getRecord(this.timer);
    this.form.controls.timer.enable();
  }

  changeGameMode(event: Event): void {
    const timer: number = +(event.target as HTMLFormElement).value;
    this.game.timer = this.game.initialTimer = timer;
    this.record = this.gameService.getRecord(timer);
  }

  changeUser(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  createMessage(game: Game, name: string): string {
    const record: number = this.gameService.getRecord(game.initialTimer);

    if (game.clicks === record) {
      return `Congratululation, ${name}!!!
      You set new record for ${game.initialTimer} sec = ${game.clicks}`;
    } else if (game.clicks + 5 > record) {
      return `${name}, your result is good, but not enough for being champion.`;
    } else {
      return `${name}, your result is bad, you have to more practice`;
    }
  }
}
