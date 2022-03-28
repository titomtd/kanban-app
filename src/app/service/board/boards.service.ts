import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Board} from "../../model/board.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private REST_API_SERVER = "http://localhost:5432/api/boards"

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    const returnList: Board[] = [];
    return this.httpClient.get<Board[]>(this.REST_API_SERVER).pipe(
      map(function (list: Board[]): Board[] {
        list.forEach(item => returnList.push(new Board(item)))
        return returnList;
      })
    );
  }

  public sendPostRequest(label: string) {
    return this.httpClient.post<any>(this.REST_API_SERVER, {'label' : label});
  }
}
