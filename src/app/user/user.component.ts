import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user/user.service";
import {User} from "../core/domains";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: User;


  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMe().subscribe(data => {
      this.user = data;
      alert('usercomponent-ngoninit-user = '+this.user);
    });

  }
}
