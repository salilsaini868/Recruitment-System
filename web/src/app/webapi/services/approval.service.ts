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
import { ApprovalEventRoleViewModel } from '../models/approval-event-role-view-model';
import { ApprovalTransactionViewModel } from '../models/approval-transaction-view-model';


@Injectable()
export class ApprovalService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param approvalId - undefined
   */
  ApiApprovalGetApprovalEventsGetResponse(approvalId: number): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (approvalId != null) __params = __params.set("approvalId", approvalId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Approval/GetApprovalEvents`,
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
   * @param approvalId - undefined
   */
  ApiApprovalGetApprovalEventsGet(approvalId: number): Observable<IResult> {
    return this.ApiApprovalGetApprovalEventsGetResponse(approvalId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  ApiApprovalGetApprovalsGetResponse(): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Approval/GetApprovals`,
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
  ApiApprovalGetApprovalsGet(): Observable<IResult> {
    return this.ApiApprovalGetApprovalsGetResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  ApiApprovalGetAllApprovalEventRolesGetResponse(): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Approval/GetAllApprovalEventRoles`,
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
  ApiApprovalGetAllApprovalEventRolesGet(): Observable<IResult> {
    return this.ApiApprovalGetAllApprovalEventRolesGetResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param openingId - undefined
   */
  ApiApprovalGetApprovalTransactionByEntityGetResponse(openingId: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (openingId != null) __params = __params.set("openingId", openingId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Approval/GetApprovalTransactionByEntity`,
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
   * @param openingId - undefined
   */
  ApiApprovalGetApprovalTransactionByEntityGet(openingId: string): Observable<IResult> {
    return this.ApiApprovalGetApprovalTransactionByEntityGetResponse(openingId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param approvalEventRoleViewModel - undefined
   */
  ApiApprovalCreateEventRolePostResponse(approvalEventRoleViewModel?: ApprovalEventRoleViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = approvalEventRoleViewModel;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Approval/createEventRole`,
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
   * @param approvalEventRoleViewModel - undefined
   */
  ApiApprovalCreateEventRolePost(approvalEventRoleViewModel?: ApprovalEventRoleViewModel): Observable<IResult> {
    return this.ApiApprovalCreateEventRolePostResponse(approvalEventRoleViewModel).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param approvalTransactionViewModel - undefined
   */
  ApiApprovalUpdateApprovalTransactionPutResponse(approvalTransactionViewModel?: ApprovalTransactionViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = approvalTransactionViewModel;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Approval/updateApprovalTransaction`,
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
   * @param approvalTransactionViewModel - undefined
   */
  ApiApprovalUpdateApprovalTransactionPut(approvalTransactionViewModel?: ApprovalTransactionViewModel): Observable<IResult> {
    return this.ApiApprovalUpdateApprovalTransactionPutResponse(approvalTransactionViewModel).pipe(
      map(_r => _r.body)
    );
  }}

export module ApprovalService {
}
