import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  users: Array<any>;

  constructor(private app: AppService) {
  }

  authenticated() { return this.app.authenticated; }

}
