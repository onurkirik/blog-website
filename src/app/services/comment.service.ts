import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(
    private _base: BaseService
  ) {
    super(_base.http)
  }

  public getComments() {
    return this._base.getReq('/comments');
  }
}
