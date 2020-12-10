import { User } from '../interfaces';
import { Injectable } from '@angular/core';

Injectable();
export class UserService {

  login(name: string): void {
    localStorage.setItem('currentUser', JSON.stringify({name}));
  }

  logout():void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
