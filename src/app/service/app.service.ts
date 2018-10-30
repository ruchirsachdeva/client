import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppService {

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
      return callback && callback();
    });

  }


  authenticateGoogle(credentials, callback) {

    const headerss = new HttpHeaders(localStorage.getItem('jwt') ? {
      authorization: 'Bearer ' + localStorage.getItem('jwt')
    }: null);

    const httpOptions = {
      headers: headerss
    };


    this.http.post('//localhost:8080/api/auth/google', credentials, httpOptions).subscribe(response => {
      console.log('auth response.....');
      console.log(response['token']);
      localStorage.setItem('jwt', response['token']);
      alert(localStorage.getItem('jwt'));
      return callback && callback();
    });

  }





  logout() {
    localStorage.removeItem('jwt');
    return this.http.post('//localhost:8080/logout',null);
  //  this.authEvents.next(new DidLogout());
  }


}
