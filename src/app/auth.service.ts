
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  userId: string;
  fbToken: string;

  getToken() {
    return this.userId + '----' + this.fbToken;
  }

  setToken(userId: string, fbToken: string) {
    this.userId = userId;
    this.fbToken = fbToken;
  }
}

export module AuthService {
}
