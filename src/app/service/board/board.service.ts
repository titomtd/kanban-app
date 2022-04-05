import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Board } from "../../model/board.model";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private REST_API_BOARDS = "http://localhost:5432/api/boards";
  private REST_API_BOARD = "http://localhost:5432/api/board/";

  constructor(private httpClient: HttpClient) { }

  public getAllBoards(): Observable<Board[]> {
    const returnList: Board[] = [];
    return this.httpClient
      .get<Board[]>(this.REST_API_BOARDS)
      .pipe(
         map(function (list: Board[]): Board[] {
          list.forEach(item => returnList.push(new Board(item)))
          return returnList;
        })
      )
    ;
  }

  public getBoard(id: any) {
    return this.httpClient.get<Board>(this.REST_API_BOARD + id);
  }

  public createBoard(body: any) {
    return this.httpClient.post<Board>(this.REST_API_BOARDS, body);
  }

  public deleteBoard(id: undefined) {
    return this.httpClient.delete(this.REST_API_BOARD + id);
  }

  public updateBoard(id: any, body: any) {
    return this.httpClient.post<Board>(this.REST_API_BOARD + id, body);
  }

  public addNewSection(id: any, body: any) {
    return this.httpClient.patch<Board>(this.REST_API_BOARD + id + "/section", body);
  }
}
