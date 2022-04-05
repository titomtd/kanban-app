import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { Tag } from "../../model/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private REST_API_TAGS = "http://localhost:5432/api/tags";
  private REST_API_TAG = "http://localhost:5432/api/tag/";

  constructor(private httpClient: HttpClient) { }

  public getAllTags(){
    const returnList: Tag[] = [];
    return this.httpClient.get<Tag[]>(this.REST_API_TAGS).pipe(
      map(function (list: Tag[]): Tag[] {
        list.forEach(item => returnList.push(new Tag(item)))
        return returnList;
      })
    );
  }

  public createTag(body: any) {
    return this.httpClient.post<Tag>(this.REST_API_TAGS, body);
  }

  public deleteTag(id: any) {
    return this.httpClient.delete(this.REST_API_TAG + id);
  }
}
