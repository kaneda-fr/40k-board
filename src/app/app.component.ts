import { Component } from '@angular/core';
import { FacebookService, LoginResponse} from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Echelons de Commandement 40k';
  isLoggedIn = false;

  constructor(private fb: FacebookService) {
    console.log('Initializing Facebook');

    fb.init({
      appId: '1927971220769787',
      version: 'v2.9'
    });

  }

  /**
   * Login with minimal permissions. This allows you to see their public profile only.
   */
  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
        if (res.status = 'connected') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        console.log('Logged in', res);
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
  getProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
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
