import { Component, OnInit, isDevMode } from '@angular/core';

import { AuthService } from './auth.service';
// import { MessageService } from './message.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Echelons de Commandement 40k';
  isLoggedIn = false;
  joueur = 'unknown';
  fbToken: string;
  fbName: string;
  userId: string;
  isAdmin = false;
  isActif = false;

  navLinks = [
    { path: '/classement', label: 'Classement' },
    { path: '/stats', label: 'Stats' },
    { path: '/match', label: 'Saisie Partie' },
    { path: '/reglement', label: 'Règlement' },
  ];

  constructor(
    public authService: AuthService
    // private messageService: MessageService
  ) { }

   ngOnInit() {
     this.authService.initFB(environment.fbAppId);
   }

  login() {
    this.authService.login();
  }

  /*
  miseajour(nom) {
    // Handle the event
    console.log(JSON.stringify(nom));
    this.joueur = nom;
  }

  miseajourClassement(event) {
    this.messageService.nouveauClassement();
  }*/
}
