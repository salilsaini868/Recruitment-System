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
import { CandidateViewModel } from '../models/candidate-view-model';
import { CandidateAssignedUserModel } from '../models/candidate-assigned-user-model';


@Injectable()
export class CandidateService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param candidateView - undefined
   */
  ApiCandidateAddCandidatePostResponse(candidateView?: CandidateViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = candidateView;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Candidate/AddCandidate`,
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
   * @param candidateView - undefined
   */
  ApiCandidateAddCandidatePost(candidateView?: CandidateViewModel): Observable<IResult> {
    return this.ApiCandidateAddCandidatePostResponse(candidateView).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param candidateAssignedUserList - undefined
   */
  ApiCandidateAddUserForCandidatePostResponse(candidateAssignedUserList?: CandidateAssignedUserModel[]): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = candidateAssignedUserList;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Candidate/AddUserForCandidate`,
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
   * @param candidateAssignedUserList - undefined
   */
  ApiCandidateAddUserForCandidatePost(candidateAssignedUserList?: CandidateAssignedUserModel[]): Observable<IResult> {
    return this.ApiCandidateAddUserForCandidatePostResponse(candidateAssignedUserList).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param candidateView - undefined
   */
  ApiCandidateUpdateCandidatePutResponse(candidateView?: CandidateViewModel): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = candidateView;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Candidate/UpdateCandidate`,
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
   * @param candidateView - undefined
   */
  ApiCandidateUpdateCandidatePut(candidateView?: CandidateViewModel): Observable<IResult> {
    return this.ApiCandidateUpdateCandidatePutResponse(candidateView).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  ApiCandidateGetAllCandidateGetResponse(): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Candidate/GetAllCandidate`,
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
  ApiCandidateGetAllCandidateGet(): Observable<IResult> {
    return this.ApiCandidateGetAllCandidateGetResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  ApiCandidateGetCandidateByIdGetResponse(id: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Candidate/GetCandidateById`,
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
  ApiCandidateGetCandidateByIdGet(id: string): Observable<IResult> {
    return this.ApiCandidateGetCandidateByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param candidateId - undefined
   */
  ApiCandidateGetAssignedUsersByIdGetResponse(candidateId: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (candidateId != null) __params = __params.set("candidateId", candidateId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Candidate/GetAssignedUsersById`,
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
   * @param candidateId - undefined
   */
  ApiCandidateGetAssignedUsersByIdGet(candidateId: string): Observable<IResult> {
    return this.ApiCandidateGetAssignedUsersByIdGetResponse(candidateId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param userId - undefined
   */
  ApiCandidateGetCandidatesCorrespondingToLoggedUserGetResponse(userId: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (userId != null) __params = __params.set("userId", userId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Candidate/GetCandidatesCorrespondingToLoggedUser`,
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
   * @param userId - undefined
   */
  ApiCandidateGetCandidatesCorrespondingToLoggedUserGet(userId: string): Observable<IResult> {
    return this.ApiCandidateGetCandidatesCorrespondingToLoggedUserGetResponse(userId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param candidateId - undefined
   */
  ApiCandidateApprovedForInterviewPutResponse(candidateId: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (candidateId != null) __params = __params.set("candidateId", candidateId.toString());
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Candidate/ApprovedForInterview`,
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
   * @param candidateId - undefined
   */
  ApiCandidateApprovedForInterviewPut(candidateId: string): Observable<IResult> {
    return this.ApiCandidateApprovedForInterviewPutResponse(candidateId).pipe(
      map(_r => _r.body)
    );
  }}

export module CandidateService {
}
