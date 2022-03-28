import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private REST_API_SERVER = "http://localhost:5432/api/board/"

  constructor(private httpClient: HttpClient) { }

  public sendDeleteRequest(id: undefined) {
    return this.httpClient.delete(this.REST_API_SERVER + id);
  }

  public sendPostRequest(id: undefined, label: undefined) {
    return this.httpClient.post(this.REST_API_SERVER + id, {'label' : label});
  }
}
