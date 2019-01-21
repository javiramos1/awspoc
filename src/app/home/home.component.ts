import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name: string;
  public todos: any;

  constructor(private authService: AuthService, private http: Http,) { }

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

   // this.getTodos();
  }

  //Example API Call
  getTodos(){
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error("session error: ", err);
        return;
      }
      console.log("session ", session.getIdToken().getJwtToken());
     
      this.http.get('https://en25ahf3y0.execute-api.eu-west-1.amazonaws.com/dev/todos', { //TODO: Update
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (result) => {
            console.log(result.json());
            this.todos = result.json();
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }

}
