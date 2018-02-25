
import { Injectable, OnInit } from '@angular/core';
import { FacebookService, LoginResponse} from 'ngx-facebook';
import { ApiService } from './services';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(
    private apiService: ApiService,
    private fb: FacebookService,
    private router: Router,
  ) {}

  userId: string;
  fbToken: string;
  fbName: string;
  fbAppId: string;
  public isAdmin = false;
  public isActif = false;
  public isLoggedIn = false;
  joueur = 'unknown';

  getToken() {
    return this.userId + '----' + this.fbToken;
  }

  setToken(userId: string, fbToken: string) {
    this.userId = userId;
    this.fbToken = fbToken;
  }

  getFbName() {
    return this.fbName;
  }

  admin() {
    return this.isAdmin;
  }

  actif() {
    return this.isActif;
  }

  nom() {
    return this.joueur;
  }

  loggedIn() {
    return this.isLoggedIn;
  }

  initFB(fbAppId: string) {
    console.log('Initializing Facebook');

    this.fbAppId = fbAppId;

    console.log('fbAppId: ' + fbAppId );

    this.fb.init({
      appId: fbAppId,
      version: 'v2.11'
    });
  }

  getjoueurfb(userid: string): void {
    console.log('Appel API ' + userid);
    this.apiService.joueurFBGET(userid)
     .subscribe(joueur => {
       console.log('got API response');
       if (joueur.nom) {
         this.joueur = joueur.nom;

         if (joueur.admin) {
         this.isAdmin = joueur.admin;
         console.log('Joueur Admin: ' + joueur.admin);
       }
       if (joueur.actif) {
         this.isActif = joueur.actif;
         console.log('Joueur Actif: ' + joueur.actif);
       } else {
         this.isActif = false;
         console.log('Joueur Actif ' + joueur.actif);
       }
       this.isLoggedIn = true;
       } else {
         console.log('Joueur inconnu');
         // [routerLink]="[{ outlets: { popup: ['login'] } }]
         this.router.navigate([{ outlets: { popup: ['login'] } }]);
       }
     });
  }

  /**
   * Login with minimal permissions. This allows you to see their public profile only.
   */
  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
        if (res.status = 'connected') {
          console.log(res.authResponse.userID + ' -- ' + res.authResponse.accessToken);
          this.fbToken = res.authResponse.accessToken;
          this.userId = res.authResponse.userID;
          // registering token with AuthService
          this.setToken(this.userId, this.fbToken);

          this.getjoueurfb(this.userId);
        } else {
          this.isLoggedIn = false;
        }
        console.log('Logged in', res);


        this.getProfile();
      })
      .catch(this.handleError);
  }

  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }


  /**
   * Get the user's profile
   */
  getProfile(): any {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
        this.fbName = res.name;
      })
      .catch(this.handleError);
  }

  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }
}

export module AuthService {
}
