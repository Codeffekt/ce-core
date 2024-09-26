import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  AccountSettings, APIError, APIErrorFactory, API_STATUS_UNKNOWN, AssetElt,
  DbArrayRes,
  FormInstance, FormMutate, FormQuery, FormRoot,
  IndexType, Utils
} from '@codeffekt/ce-core-data';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CeCoreModuleConfig, CE_CORE_CONFIG } from '../ce-core.config';

export enum UpdateStatus {
  IDLE = 0,
  SAVING
}
export interface JwtPayload {
  uid: string;
  aud: string;
  sub: string;
}

export interface ResAuthenticate {
  res: string;
  token: string;
  data: JwtPayload & AccountSettings;
  exp: number;
}

export interface LocalUserSettings {
  token: string;
  settings: JwtPayload & AccountSettings;
  expMs: number;
}

interface MyHttpParams {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
export interface CeCoreUploadInput {
  type: 'uploadAll';
  url: string;
  method: string;
  headers: {
    [key: string]: string;
  };
}

const COUNTDOWN_DELTA_MS = 5000;

@Injectable({
  providedIn: 'root'
})
export class CeCoreService {

  private api_url: string;
  private currentUser!: LocalUserSettings;

  error$: Subject<any> = new Subject();

  private tokenTimeoutId;

  constructor(
    private http: HttpClient,
    @Inject(CE_CORE_CONFIG) config: CeCoreModuleConfig
  ) {
    this.api_url = Utils.cleanUrlEndPoint(config.api_url);
  }

  newAssetUploadInput(assetId: IndexType): CeCoreUploadInput {
    return {
      type: 'uploadAll',
      url: `${this.api_url}/assets/upload/${assetId}`,
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.getToken() },
    };
  }

  thumbPathFromAssetId(assetId: IndexType, dimension?: number): string {
    const token = this.getToken();
    const dimensionParam = dimension !== undefined ? `&dim=${dimension}` : "";
    return `${this.api_url}/assets/images/${assetId}?token=${token}${dimensionParam}`;
  }

  imagePathFromAssetId(assetId: IndexType): string {
    return this.thumbPathFromAssetId(assetId);
  }

  urlFromAssetId(assetId: IndexType): string {
    const token = this.getToken();
    return `${this.api_url}/assets/download/${assetId}?token=${token}`;
  }

  getApi(): string {
    return `${this.api_url}/api`;
  }

  getAuth(): string {
    return this.api_url;
  }

  getToken(): string {
    return this.getLocalUser().token;
  }

  call<T>(...params: any[]): Observable<T> {
    return this._call.bind(this, this.getApi.bind(this) as any, this.getCallPost, {
      headers: this.getHeaders()
    }).apply(this, params) as any;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getProject(id: IndexType): Observable<FormInstance> {
    return this.call("PublicProject", "getProject", id);
  }

  getForm(fid: IndexType): Observable<FormRoot> {
    return this.callForms("get", fid);
  }

  updateForm(formInstance: FormInstance): Observable<FormRoot> {
    return this.callForms("update", formInstance);
  }

  getFormRoot(fid: IndexType): Observable<FormRoot> {
    return this.callForms("getRoot", fid);
  }

  updateFormRoot(formInstance: FormRoot): Observable<FormRoot> {
    return this.callForms("updateRoot", formInstance);
  }

  getAsset(id: IndexType): Observable<AssetElt> {
    return this.call("PublicAssets", "get", id);
  }

  async authenticate(login: string, pwd: string): Promise<boolean> {

    const session = await this.http.post<ResAuthenticate>(`${this.getAuth()}/login`,
      { "login": login, "passwd": pwd }, {
      withCredentials: true
    }).toPromise();

    const token = session.token;
    this.setLocalUser({ token: token, settings: session.data, expMs: session.exp * 1000 });
    this.setTokenTimeout();

    return true;
  }

  self(): Observable<LocalUserSettings> {
    return of(this.getLocalUser());
  }

  async persistent(force: boolean = false) {

    if (!force && this.isLoggedIn()) {
      return true;
    }
    try {
      const resp = await this.http.get<ResAuthenticate>(`${this.getAuth()}/persistent`, { withCredentials: true }).toPromise();
      const token = resp.token;
      this.setLocalUser({ token: token, settings: resp.data, expMs: resp.exp * 1000 });
      this.setTokenTimeout();
      return true;
    } catch (err) {
      this.logOut();
      return false;
    }
  }

  isLoggedIn() {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.token && (currentUser.expMs >= Date.now())) {
      return true;
    }

    return false;
  }

  isCurrentUserAdmin() {
    return this.currentUser !== undefined && this.currentUser.settings.role === "admin";
  }

  async logOut() {
    if (this.tokenTimeoutId) {
      clearTimeout(this.tokenTimeoutId);
      this.tokenTimeoutId = undefined;
    }
    this.removeLocalUser();
    await this.http.get<boolean>(`${this.getAuth()}/logout`, { withCredentials: true }).toPromise();
  }

  callProject(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicProject", func].concat(params));
  }

  callAssets(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicAssets", func].concat(params));
  }

  callForms(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicForms", func].concat(params));
  }

  callFormsRoot(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicFormsRoot", func].concat(params));
  }

  callAccount(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicAccounts", func].concat(params));
  }

  callFormsQuery(pid: IndexType, query: FormQuery): Observable<DbArrayRes<FormInstance>> {
    return this.callProject("formsQuery", pid, query);
  }

  callFormQuery(pid: IndexType, id: IndexType, query: FormQuery) {
    return this.callProject("formQuery", pid, id, query);
  }

  callFormMutation(pid: IndexType, mutation: FormMutate): Observable<FormInstance> {
    return this.callProject("formMutation", pid, mutation);
  }

  callSpaces(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicSpaces", func].concat(params));
  }

  callSpacesEditor(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicSpacesEditor", func].concat(params));
  }

  callProcessing(func: string, ...params: any[]): Observable<any> {
    return this.call.apply(this, ["PublicProcessing", func].concat(params));
  }

  /**
   * Use this method to integrate other apis calls 
   * through core api auth session
   * @param apiFunc 
   * @param params 
   * @returns 
   */
  callRest<T>(apiFunc: () => string, params: any): Observable<T> {
    return this._call.bind(this, apiFunc, () => params, {
      headers: this.getHeaders()
    }).apply(this, params) as any;
  }

  callRestGet<T>(apiFunc: () => string): Observable<T> {
    return this._call_get.bind(this, apiFunc, {
      headers: this.getHeaders()
    }).apply(this) as any;
  }

  handleError(error: HttpErrorResponse) {
    const apiError: APIError = error.error instanceof ErrorEvent ?
      new APIError(API_STATUS_UNKNOWN, error.error.message) :
      APIErrorFactory.fromAPIStatusError(error.error);
    this.error$.next(error);
    return throwError(apiError);
  }

  private getCallPost(className: string, func: any, ...others: any[]) {

    interface CallParams {
      function: string;
      params?: any[];
    }

    interface PostMessage {
      __class: string;
      call: CallParams;
    }

    const post: PostMessage = {
      "__class": className,
      "call": { "function": func }
    };

    if (others.length > 0) { // remove null && undefined parameters in array
      post.call.params = Array.isArray(others) ? others.filter(e => e !== undefined && e !== null) : others;
    }

    return post;
  }

  private _call<T>(getApiFunc: () => string, msgFunc: () => any, options: MyHttpParams, ...params: any[]): Observable<T> {

    const options_final: MyHttpParams = {
      responseType: "json",
      observe: "body",
      ...options
    };

    return this.http.post<T>(
      getApiFunc(),
      msgFunc.apply(this, params as any),
      options_final
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private _call_get<T>(getApiFunc: () => string, options: MyHttpParams, ...params: any[]): Observable<T> {

    const options_final: MyHttpParams = {
      responseType: "json",
      observe: "body",
      ...options
    };

    return this.http.get<T>(
      getApiFunc(),
      options_final
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  
  private getHeaders(): any {
    const headers: any = {
      "Content-Type": "application/json"
    };

    const currentUser = this.getLocalUser();
    if (currentUser && currentUser.token) {
      headers["Authorization"] = "Bearer " + currentUser.token;
    }

    return headers;
  }

  protected getLocalUser(): LocalUserSettings {
    return JSON.parse(localStorage.getItem('currentUser') as any);
  }

  protected setLocalUser(user: LocalUserSettings) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  protected removeLocalUser() {
    this.currentUser = undefined as any;
    localStorage.removeItem('currentUser');
  }

  private setTokenTimeout() {

    if (this.tokenTimeoutId !== undefined) {
      clearTimeout(this.tokenTimeoutId);
      this.tokenTimeoutId = undefined;
    }

    const countDownMs = this.getLocalUser().expMs - Date.now() - COUNTDOWN_DELTA_MS;

    if (!countDownMs || countDownMs < 0) {
      throw new Error(`Cannot set token timeout ${countDownMs}`);
    }

    this.tokenTimeoutId = setTimeout(() => {
      this.persistent(true);
    }, countDownMs);
  }
}
