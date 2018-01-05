import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Address } from "cluster";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {

  userList:User[];
  
  constructor(private http:Http) {
    
  }

  private baseUrl:string = 'http://localhost:8080/api';
  private getUrl:string = this.baseUrl + '/users';
  
  getUsers(): Observable<User[]> {
    return this.http
      .get(this.getUrl)
      .map(this.mapUser);
  }
  
   mapUser(response:Response):User[] {
    return response.json();
  }
  
  sayHello (username:string) {
    //console.log('hello '+ username);
     this.getUsers()
      .subscribe(
        users => {
          this.userList = users;
        },
        err => {
          // Log errors if any
          console.log(err);
        });
      return this.userList;
  }
  
  ngOnInit() {
     this.sayHello('test');
  }
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
}


