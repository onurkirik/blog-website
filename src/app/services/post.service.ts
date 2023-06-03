import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {

  constructor(
    private _base: BaseService
  ) {
    super(_base.http)
  }

  public getPosts() {
    return this._base.getReq('/posts');
  }

  public updatePost(id:any, data:any) {
    return this._base.putReq(`/posts/${id}`, data);
  }

}
