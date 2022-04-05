import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Section } from "../../model/section.model";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private REST_API_SECTIONS = "http://localhost:5432/api/sections";
  private REST_API_SECTION = "http://localhost:5432/api/section/";

  constructor(private httpClient: HttpClient) { }

  public updateSection(id: any, body: any) {
    return this.httpClient.post<Section>(this.REST_API_SECTION + id, body);
  }

  public deleteSection(id: any) {
    return this.httpClient.delete(this.REST_API_SECTION + id);
  }

  public addNewCard(id: any, body: any) {
    return this.httpClient.patch<Section>(this.REST_API_SECTION + id + "/card", body);
  }
}
