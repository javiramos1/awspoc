import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name : string;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    const cognitoUser = this.authService.getAuthenticatedUser();
    cognitoUser.getSession(function (err, session) {

      cognitoUser.getUserAttributes(function(err, result) {
          if (err) {
              console.log(err);
              return;
          }
          for (let i = 0; i < result.length; i++) {
              console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
          }
      });

  });

    this.name = this.authService.getAuthenticatedUser().getUsername();
  }

}
