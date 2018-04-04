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
   * @param candidate - undefined
   */
  ApiCandidateAddCandidatePostResponse(candidate?: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (candidate != null) __params = __params.set("candidate", candidate.toString());
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
   * @param candidate - undefined
   */
  ApiCandidateAddCandidatePost(candidate?: string): Observable<IResult> {
    return this.ApiCandidateAddCandidatePostResponse(candidate).pipe(
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
   * @param candidate - undefined
   */
  ApiCandidateUpdateCandidatePutResponse(candidate?: string): Observable<HttpResponse<IResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (candidate != null) __params = __params.set("candidate", candidate.toString());
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
   * @param candidate - undefined
   */
  ApiCandidateUpdateCandidatePut(candidate?: string): Observable<IResult> {
    return this.ApiCandidateUpdateCandidatePutResponse(candidate).pipe(
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
  }
  /**
   * @param file - undefined
   * @param WebRootPath - undefined
   * @param WebRootFileProvider - undefined
   * @param EnvironmentName - undefined
   * @param ContentRootPath - undefined
   * @param ContentRootFileProvider - undefined
   * @param ApplicationName - undefined
   */
  ApiCandidateDownloadFilePostResponse(params: CandidateService.ApiCandidateDownloadFilePostParams): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.file != null) __params = __params.set("file", params.file.toString());
    if (params.WebRootPath != null) __params = __params.set("WebRootPath", params.WebRootPath.toString());
    if (params.WebRootFileProvider != null) __params = __params.set("WebRootFileProvider", params.WebRootFileProvider.toString());
    if (params.EnvironmentName != null) __params = __params.set("EnvironmentName", params.EnvironmentName.toString());
    if (params.ContentRootPath != null) __params = __params.set("ContentRootPath", params.ContentRootPath.toString());
    if (params.ContentRootFileProvider != null) __params = __params.set("ContentRootFileProvider", params.ContentRootFileProvider.toString());
    if (params.ApplicationName != null) __params = __params.set("ApplicationName", params.ApplicationName.toString());
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Candidate/DownloadFile`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string
        return _resp.clone({body: _body}) as HttpResponse<string>;
      })
    );
  }

  /**
   * @param file - undefined
   * @param WebRootPath - undefined
   * @param WebRootFileProvider - undefined
   * @param EnvironmentName - undefined
   * @param ContentRootPath - undefined
   * @param ContentRootFileProvider - undefined
   * @param ApplicationName - undefined
   */
  ApiCandidateDownloadFilePost(params: CandidateService.ApiCandidateDownloadFilePostParams): Observable<string> {
    return this.ApiCandidateDownloadFilePostResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module CandidateService {
  export interface ApiCandidateDownloadFilePostParams {
    file?: string;
    WebRootPath?: string;
    WebRootFileProvider?: any;
    EnvironmentName?: string;
    ContentRootPath?: string;
    ContentRootFileProvider?: any;
    ApplicationName?: string;
  }
}
