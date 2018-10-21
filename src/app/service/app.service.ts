import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

    const headerss = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {
      authorization: 'Bearer ' + localStorage.getItem('jwt')
    });

    const httpOptions = {
      headers: headerss
    };


    this.http.post('//localhost:8080/api/auth', credentials, httpOptions).subscribe(response => {
      console.log('auth response.....');
      console.log(response['token']);
      localStorage.setItem('jwt', response['token']);
      alert(localStorage.getItem('jwt'));
        if (localStorage.getItem('jwt')) {
        this.authenticated = true;
      } else {
       this.authenticated = false;
      }
      return callback && callback();
    });

  }

  authenticateGoogle(callback) {


    this.http.post('//localhost:8080/connect/google', null).subscribe(response => {
      console.log('auth response.....');
      console.log(response['token']);
      localStorage.setItem('jwt', response['token']);
      alert(localStorage.getItem('jwt'));
      if (localStorage.getItem('jwt')) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }





  logout(): void {
    localStorage.removeItem('jwt');
  //  this.authEvents.next(new DidLogout());
  }


}
