import { Component, isDevMode } from '@angular/core';
import { FacebookService, LoginResponse} from 'ngx-facebook';
import { ApiService } from './services';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Echelons de Commandement 40k';
  isLoggedIn = false;
  joueur = 'unknown';
  fbToken: string;
  fbName: string;
  userId: string;
  isAdmin = false;
  isActif = false;

  constructor(private fb: FacebookService, private apiService: ApiService, private authService: AuthService) {
        console.log('Admin type: ' + typeof this.isAdmin);
    console.log('isActif type: ' + typeof this.isActif);

    let fbAppId;
    console.log('Initializing Facebook');

    if (! isDevMode()) {
      fbAppId = '160617551370574';
    } else {
      console.log('FB will be initialized for Dev Mode');
      fbAppId = '638322569876518';
    }

    fb.init({
      appId: fbAppId,
      version: 'v2.9'
    });

  }

  getjoueurfb(userid: string): void {
    console.log('Appel API ' + userid);
    this.apiService.joueurFBGET(userid)
     .subscribe(joueur => {
       console.log('got API response');
       if (joueur.nom) {
         this.joueur = joueur.nom;
       }
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
          this.getjoueurfb(this.userId);
        } else {
          this.isLoggedIn = false;
        }
        console.log('Logged in', res);
        // registering token with AuthService
        this.authService.setToken(this.userId, this.fbToken);

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

  miseajour(nom) {
    // Handle the event
    console.log(JSON.stringify(nom));
    this.joueur = nom;
  }
}
