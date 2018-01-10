/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { IResult } from '../models/iresult';
import { UserLoginModel } from '../models/user-login-model';


@Injectable()
export class LoginService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param loginModel - undefined
   */
  ApiLoginLoginUserPostResponse(loginModel?: UserLoginModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = loginModel;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Login/LoginUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: IResult = null;
        _body = _resp.body as IResult
        return _resp.clone({body: _body}) as HttpResponse<IResult>;
      })
    );
  }

  /**
   * @param loginModel - undefined
   */
  ApiLoginLoginUserPost(loginModel?: UserLoginModel): Observable<IResult> {
    return this.ApiLoginLoginUserPostResponse(loginModel).pipe(
      map(_r => _r.body)
    );
  }}

export module LoginService {
}
