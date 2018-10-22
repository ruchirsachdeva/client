import { Component } from '@angular/core';
import { AppService } from './service/app.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import {
  GoogleLoginProvider, FacebookLoginProvider, AuthService,
  LinkedinLoginProvider
} from "angular-6-social-login-v2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private app: AppService, private router: Router, private socialAuthService: AuthService) {
    this.app.authenticate(undefined, undefined);
  }
  logout() {
    this.app.logout();
  /**  this.app.logoutPost().finally(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    }).subscribe();**/
  }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
/**
    this.app.authenticateGoogle(() => {
      console.log(" sign in data google *******: ");
      this.router.navigateByUrl('/');
    })
**/
// this.socialAuthService.signOut();
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {


        console.log(socialPlatform+" sign in data : " , userData);

        var credentials = {token: userData['token']};
        console.log(credentials + " credentyials *******");
        alert('send token to server and get jwt authentication token (either by creating a customer or authenticating on server)');
          this.app.authenticateGoogle(credentials, () => {
            this.router.navigateByUrl('/');
          });


        // Now sign-in with userData
        // ...

      }
    );
  }

}
