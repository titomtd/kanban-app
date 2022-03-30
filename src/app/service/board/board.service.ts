import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Board} from "../../model/board.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private REST_API_BOARDS = "http://localhost:5432/api/boards";
  private REST_API_BOARD = "http://localhost:5432/api/board/";

  constructor(private httpClient: HttpClient) { }

  public getAllBoards(){
    const returnList: Board[] = [];
    return this.httpClient.get<Board[]>(this.REST_API_BOARDS).pipe(
      map(function (list: Board[]): Board[] {
        list.forEach(item => returnList.push(new Board(item)))
        return returnList;
      })
    );
  }

  public createBoard(label: string) {
    return this.httpClient.post<any>(this.REST_API_BOARDS, {'label' : label});
  }

  public deleteBoard(id: undefined) {
    return this.httpClient.delete(this.REST_API_BOARD + id);
  }

  public updateBoard(id: undefined, label: undefined) {
    return this.httpClient.post(this.REST_API_BOARD + id, {'label' : label});
  }
}
