/* tslint:disable */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, Request, RequestOptionsArgs,RequestOptions, URLSearchParams } from '@angular/http';
import { QualificationViewModel, IResult, SkillViewModel, UserLoginModel, UserViewModel } from './models';
import 'rxjs/Rx';

/**
* Created with angular2-swagger-client-generator v
*/
@Injectable()
export class ApiClientService {
domain:string;
public defaultHeaders : Headers = new Headers();
constructor(public http: Http){
  this.domain = '';
}
/*
constructor(public http: Http, options?: any) {
var domain = (typeof options === 'object') ? options.domain : options;
this.domain = typeof(domain) === 'string' ? domain : '';

if(this.domain.length === 0) {
throw new Error('Domain parameter must be specified as a string.');
}

  this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
}
*/


  /**
  *
  * @method
  * @name ApiApprovalGetAllApprovalsGet
  *
  */
  public ApiApprovalGetAllApprovalsGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Approval/GetAllApprovals`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiCandidateGetAllCandidatesGet
  *
  */
  public ApiCandidateGetAllCandidatesGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Candidate/GetAllCandidates`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiOpeningGetAllOpeningsGet
  *
  */
  public ApiOpeningGetAllOpeningsGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Opening/GetAllOpenings`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiQualificatonCreateQualificationPost
    * @param {QualificationViewModel} qualificationView - A sample API architecture for RS system.
  *
  */
  public ApiQualificatonCreateQualificationPost(qualificationView: QualificationViewModel) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      bodyVar=qualificationView;
  headers.append('Content-Type', 'application/json');
  let uri = `/api/Qualificaton/CreateQualification`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .post(this.domain + uri, JSON.stringify(bodyVar), options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiQualificatonUpdateQualificationPut
    * @param {QualificationViewModel} qualificationView - A sample API architecture for RS system.
  *
  */
  public ApiQualificatonUpdateQualificationPut(qualificationView: QualificationViewModel) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      bodyVar=qualificationView;
  headers.append('Content-Type', 'application/json');
  let uri = `/api/Qualificaton/UpdateQualification`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .put(this.domain + uri, JSON.stringify(bodyVar), options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiQualificatonGetAllQualificationGet
  *
  */
  public ApiQualificatonGetAllQualificationGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Qualificaton/GetAllQualification`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiQualificatonGetQualificationlByIdGet
    * @param {integer} id - A sample API architecture for RS system.
  *
  */
  public ApiQualificatonGetQualificationlByIdGet(id: number) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      if(id === undefined){
      throw new Error('Missing required number parameter: id');
      }

                if (id !== 0) {
                queryParameters.set('id',id.toString());
                }

  headers.append('Content-Type', 'application/json');
  let uri = `/api/Qualificaton/GetQualificationlById`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiRoleGetAllRoleGet
  *
  */
  public ApiRoleGetAllRoleGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Role/GetAllRole`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiRoleGetRoleByIdGet
    * @param {integer} id - A sample API architecture for RS system.
  *
  */
  public ApiRoleGetRoleByIdGet(id: number) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      if(id === undefined){
      throw new Error('Missing required number parameter: id');
      }

                if (id !== 0) {
                queryParameters.set('id',id.toString());
                }

  headers.append('Content-Type', 'application/json');
  let uri = `/api/Role/GetRoleById`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiSkillCreateSkillPost
    * @param {SkillViewModel} skillView - A sample API architecture for RS system.
  *
  */
  public ApiSkillCreateSkillPost(skillView: SkillViewModel) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      bodyVar=skillView;
  headers.append('Content-Type', 'application/json');
  let uri = `/api/Skill/CreateSkill`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .post(this.domain + uri, JSON.stringify(bodyVar), options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiSkillUpdateSkillPut
    * @param {SkillViewModel} skillView - A sample API architecture for RS system.
  *
  */
  public ApiSkillUpdateSkillPut(skillView: SkillViewModel) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      bodyVar=skillView;
  headers.append('Content-Type', 'application/json');
  let uri = `/api/Skill/UpdateSkill`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .put(this.domain + uri, JSON.stringify(bodyVar), options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiSkillGetAllSkillGet
  *
  */
  public ApiSkillGetAllSkillGet() {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


  headers.append('Content-Type', 'application/json');
  let uri = `/api/Skill/GetAllSkill`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiSkillGetSkillByIdGet
    * @param {integer} id - A sample API architecture for RS system.
  *
  */
  public ApiSkillGetSkillByIdGet(id: number) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      if(id === undefined){
      throw new Error('Missing required number parameter: id');
      }

                if (id !== 0) {
                queryParameters.set('id',id.toString());
                }

  headers.append('Content-Type', 'application/json');
  let uri = `/api/Skill/GetSkillById`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .get(this.domain + uri, options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
  /**
  *
  * @method
  * @name ApiUserUserLoginPost
    * @param {UserLoginModel} LoginModel - A sample API architecture for RS system.
  *
  */
  public ApiUserUserLoginPost(LoginModel: UserLoginModel) {
  let bodyVar={};
  let headers = new Headers(this.defaultHeaders.toJSON());
  let payload = {};
  let queryParameters=new URLSearchParams();


      bodyVar=LoginModel;
  headers.append('Content-Type', 'application/json');
  let uri = `/api/User/UserLogin`;
  let options = new RequestOptions({ headers: headers, search: queryParameters });

  return this.http
  .post(this.domain + uri, JSON.stringify(bodyVar), options)
  .map((res: Response) => {
     return res.arrayBuffer().byteLength > 0 ? res.json() : {};
  });

  }
}
