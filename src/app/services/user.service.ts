import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    private _base: BaseService
  ) {
    super(_base.http)
  }

  public getUsers() {
    return this._base.getReq('/users');
  }

}
