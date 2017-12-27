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
   * @param date - date du classement
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
   * @param date - date du classement
   */
  classementGET(date?: string): Observable<joueur[]> {
    return this.classementGETResponse(date).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * return a player by id
   * @param nom - nom du joueur
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
   * @param nom - nom du joueur
   */
  joueurNomGET(nom: string): Observable<joueur> {
    return this.joueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * return a player by fb userid
   * @param userid - userid FB du joueur
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
   * @param userid - userid FB du joueur
   */
  joueurFBGET(userid: string): Observable<joueur> {
    return this.joueurFBGETResponse(userid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * return list of match
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
   */
  matchGET(): Observable<match[]> {
    return this.matchGETResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * record a match
   * @param vainqueur - nom du vainqueur
   * @param perdant - nom du perdant
   * @param joueur - nom du joueur qui entre le match
   * @param formatPartie - format de la partie
   * @param armeevainqueur - armee du vainqueur
   * @param armeeperdant - armee du perdant
   * @param accessToken - token d'acces du joueur
   * @param scorevainqueur - score du vainqueur
   * @param scoreperdant - score du perdant
   * @param scenario - nom du scenario joue
   * @param powerlevel - nombre de PL de la partie
   * @param points - nombre de points de la partie
   * @param date - Date du match
   */
  matchPUTResponse(params: ApiService.MatchPUTParams): Observable<HttpResponse<match>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.vainqueur != null) __params = __params.set("vainqueur", params.vainqueur.toString());
    if (params.perdant != null) __params = __params.set("perdant", params.perdant.toString());
    if (params.joueur != null) __params = __params.set("joueur", params.joueur.toString());
    if (params.formatPartie != null) __params = __params.set("formatPartie", params.formatPartie.toString());
    if (params.armeevainqueur != null) __params = __params.set("armeevainqueur", params.armeevainqueur.toString());
    if (params.armeeperdant != null) __params = __params.set("armeeperdant", params.armeeperdant.toString());
    if (params.accessToken != null) __params = __params.set("accessToken", params.accessToken.toString());
    if (params.scorevainqueur != null) __params = __params.set("scorevainqueur", params.scorevainqueur.toString());
    if (params.scoreperdant != null) __params = __params.set("scoreperdant", params.scoreperdant.toString());
    if (params.scenario != null) __params = __params.set("scenario", params.scenario.toString());
    if (params.powerlevel != null) __params = __params.set("powerlevel", params.powerlevel.toString());
    if (params.points != null) __params = __params.set("points", params.points.toString());
    if (params.date != null) __params = __params.set("date", params.date.toString());
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
   * @param vainqueur - nom du vainqueur
   * @param perdant - nom du perdant
   * @param joueur - nom du joueur qui entre le match
   * @param formatPartie - format de la partie
   * @param armeevainqueur - armee du vainqueur
   * @param armeeperdant - armee du perdant
   * @param accessToken - token d'acces du joueur
   * @param scorevainqueur - score du vainqueur
   * @param scoreperdant - score du perdant
   * @param scenario - nom du scenario joue
   * @param powerlevel - nombre de PL de la partie
   * @param points - nombre de points de la partie
   * @param date - Date du match
   */
  matchPUT(params: ApiService.MatchPUTParams): Observable<match> {
    return this.matchPUTResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * return list of match for a player
   * @param nom - nom du joueur
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
   * @param nom - nom du joueur
   */
  matchjoueurNomGET(nom: string): Observable<match[]> {
    return this.matchjoueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }}

export module ApiService {
  export interface MatchPUTParams {
    vainqueur: string;
    perdant: string;
    joueur: string;
    formatPartie: string;
    armeevainqueur: string;
    armeeperdant: string;
    accessToken: string;
    scorevainqueur?: number;
    scoreperdant?: number;
    scenario?: string;
    powerlevel?: number;
    points?: number;
    date?: string;
  }
}
