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
import { OpeningViewModel } from '../models/opening-view-model';


@Injectable()
export class OpeningService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param openingViewModel - undefined
   */
  ApiOpeningCreateOpeningPostResponse(openingViewModel?: OpeningViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = openingViewModel;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Opening/CreateOpening`,
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
   * @param openingViewModel - undefined
   */
  ApiOpeningCreateOpeningPost(openingViewModel?: OpeningViewModel): Observable<IResult> {
    return this.ApiOpeningCreateOpeningPostResponse(openingViewModel).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param openingViewModel - undefined
   */
  ApiOpeningUpdateOpeningPutResponse(openingViewModel?: OpeningViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = openingViewModel;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Opening/UpdateOpening`,
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
   * @param openingViewModel - undefined
   */
  ApiOpeningUpdateOpeningPut(openingViewModel?: OpeningViewModel): Observable<IResult> {
    return this.ApiOpeningUpdateOpeningPutResponse(openingViewModel).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  ApiOpeningGetAllOpeningGetResponse(): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Opening/GetAllOpening`,
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
   */
  ApiOpeningGetAllOpeningGet(): Observable<IResult> {
    return this.ApiOpeningGetAllOpeningGetResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  ApiOpeningGetOpeningByIdGetResponse(id: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Opening/GetOpeningById`,
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
   * @param id - undefined
   */
  ApiOpeningGetOpeningByIdGet(id: string): Observable<IResult> {
    return this.ApiOpeningGetOpeningByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }}

export module OpeningService {
}
