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

import { joueur } from '../models/joueur';
import { Error } from '../models/error';
import { match } from '../models/match';

@Injectable()
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * return the ranking board
   * @param date date du classement
   * @return List of players by ranking order
   */
   classementGETResponse(date?: string): Observable<HttpResponse<joueur[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (date != null) __params = __params.set("date", date.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/classement`,
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
        let _body: joueur[] = null;
        _body = _resp.body as joueur[]
        return _resp.clone({body: _body}) as HttpResponse<joueur[]>;
      })
    );
  }

  /**
   * return the ranking board
   * @param date date du classement
   * @return List of players by ranking order
   */
   classementGET(date?: string): Observable<joueur[]> {
    return this.classementGETResponse(date).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * return a player by id
   * @param nom nom du joueur
   * @return show one player
   */
   joueurNomGETResponse(nom: string): Observable<HttpResponse<joueur>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/joueur/${nom}`,
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
        let _body: joueur = null;
        _body = _resp.body as joueur
        return _resp.clone({body: _body}) as HttpResponse<joueur>;
      })
    );
  }

  /**
   * return a player by id
   * @param nom nom du joueur
   * @return show one player
   */
   joueurNomGET(nom: string): Observable<joueur> {
    return this.joueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Enregistre ou met a jour un joueur
   * @param joueur details du joueur
   * @return show one player
   */
   joueurPUTResponse(joueur: joueur): Observable<HttpResponse<joueur>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = joueur;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/joueur`,
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
        let _body: joueur = null;
        _body = _resp.body as joueur
        return _resp.clone({body: _body}) as HttpResponse<joueur>;
      })
    );
  }

  /**
   * Enregistre ou met a jour un joueur
   * @param joueur details du joueur
   * @return show one player
   */
   joueurPUT(joueur: joueur): Observable<joueur> {
    return this.joueurPUTResponse(joueur).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * return list of all players
   * @param X-FB-API-Key FB token
   * @return show all player
   */
   joueursGETResponse(XFBAPIKey: string): Observable<HttpResponse<string[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (XFBAPIKey != null) __params = __params.set("X-FB-API-Key", XFBAPIKey.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/joueurs`,
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
        let _body: string[] = null;
        _body = _resp.body as string[]
        return _resp.clone({body: _body}) as HttpResponse<string[]>;
      })
    );
  }

  /**
   * return list of all players
   * @param X-FB-API-Key FB token
   * @return show all player
   */
   joueursGET(XFBAPIKey: string): Observable<string[]> {
    return this.joueursGETResponse(XFBAPIKey).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * return a player by fb userid
   * @param userid userid FB du joueur
   * @return show one player
   */
   joueurFBGETResponse(userid: string): Observable<HttpResponse<joueur>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/joueurfb/${userid}`,
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
        let _body: joueur = null;
        _body = _resp.body as joueur
        return _resp.clone({body: _body}) as HttpResponse<joueur>;
      })
    );
  }

  /**
   * return a player by fb userid
   * @param userid userid FB du joueur
   * @return show one player
   */
   joueurFBGET(userid: string): Observable<joueur> {
    return this.joueurFBGETResponse(userid).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * return list of match
   * @return show one player
   */
   matchGETResponse(): Observable<HttpResponse<match[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/match`,
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
        let _body: match[] = null;
        _body = _resp.body as match[]
        return _resp.clone({body: _body}) as HttpResponse<match[]>;
      })
    );
  }

  /**
   * return list of match
   * @return show one player
   */
   matchGET(): Observable<match[]> {
    return this.matchGETResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * record a match
   * @param match details du la partie
   * @return retourne le match
   */
   matchPUTResponse(match: match): Observable<HttpResponse<match>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = match;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/match`,
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
        let _body: match = null;
        _body = _resp.body as match
        return _resp.clone({body: _body}) as HttpResponse<match>;
      })
    );
  }

  /**
   * record a match
   * @param match details du la partie
   * @return retourne le match
   */
   matchPUT(match: match): Observable<match> {
    return this.matchPUTResponse(match).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * return list of match for a player
   * @param nom nom du joueur
   * @return liste des match
   */
   matchjoueurNomGETResponse(nom: string): Observable<HttpResponse<match[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/matchjoueur/${nom}`,
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
        let _body: match[] = null;
        _body = _resp.body as match[]
        return _resp.clone({body: _body}) as HttpResponse<match[]>;
      })
    );
  }

  /**
   * return list of match for a player
   * @param nom nom du joueur
   * @return liste des match
   */
   matchjoueurNomGET(nom: string): Observable<match[]> {
    return this.matchjoueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }
}

export module ApiService {
}
