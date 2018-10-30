import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user/user.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";

@Component({
  selector: 'app-therapy-list',
  templateUrl: './therapy-list.component.html',
  styleUrls: ['./therapy-list.component.css']
})
export class TherapyListComponent implements OnInit {
  therapies = new UserDataSource(this.userService);
  displayedColumns: any = ['id','patient','therapy','medicine','dosage','med'];


  constructor(private userService: UserService) { }

  ngOnInit() {

  }

}


export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<Array<any>> {
    return this.userService.getTherapies();
  }
  disconnect() {}
}
