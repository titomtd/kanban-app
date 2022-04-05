import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../../model/user.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_USERS = "http://localhost:5432/api/users";
  private REST_API_USER = "http://localhost:5432/api/user/";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers() {
    const returnList: User[] = [];
    return this.httpClient.get<User[]>(this.REST_API_USERS).pipe(
      map(function (list: User[]): User[] {
        list.forEach(item => returnList.push(new User(item)))
        return returnList;
      })
    );
  }

  public createUser(body: any) {
    return this.httpClient.post<User>(this.REST_API_USERS, body);
  }

  public deleteUser(id: any) {
    return this.httpClient.delete(this.REST_API_USER + id);
  }

  public updateUser(id: any, body: any) {
     return this.httpClient.post<User>(this.REST_API_USER + id, body);
  }
}
