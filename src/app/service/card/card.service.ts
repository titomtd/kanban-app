import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Card } from "../../model/card.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private REST_API_CARDS = "http://localhost:5432/api/cards";
  private REST_API_CARD = "http://localhost:5432/api/card/";

  constructor(private httpClient: HttpClient) { }

  public updateCard(id: any, body: any) {
    return this.httpClient.post<Card>(this.REST_API_CARD + id, body);
  }

  public deleteCard(id: any) {
    return this.httpClient.delete(this.REST_API_CARD + id);
  }
}
