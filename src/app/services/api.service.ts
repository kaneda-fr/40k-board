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
   * calcule le classement
   */
   classementPUTResponse(): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/classement`,
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
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * calcule le classement
   */
   classementPUT(): Observable<void> {
    return this.classementPUTResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * retourne un joueur par id
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
   * retourne un joueur par id
   * @param nom nom du joueur
   * @return show one player
   */
   joueurNomGET(nom: string): Observable<joueur> {
    return this.joueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Enregistre ou met à jour un joueur
   * @param params The `ApiService.JoueurPUTParams` containing the following parameters:
   *
   * - `nom`: nom du joueur
   *
   * - `joueur`: details du joueur
   *
   * @return show one player
   */
   joueurPUTResponse(params: ApiService.JoueurPUTParams): Observable<HttpResponse<joueur>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.joueur;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/joueur/${params.nom}`,
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
   * Enregistre ou met à jour un joueur
   * @param params The `ApiService.JoueurPUTParams` containing the following parameters:
   *
   * - `nom`: nom du joueur
   *
   * - `joueur`: details du joueur
   *
   * @return show one player
   */
   joueurPUT(params: ApiService.JoueurPUTParams): Observable<joueur> {
    return this.joueurPUTResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Enregistre ou met à jour un joueur
   * @param nom nom du joueur
   */
   joueurDELResponse(nom: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/joueur/${nom}`,
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
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * Enregistre ou met à jour un joueur
   * @param nom nom du joueur
   */
   joueurDEL(nom: string): Observable<void> {
    return this.joueurDELResponse(nom).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * retourne la liste des joueurs
   * @return show all player
   */
   joueursGETResponse(): Observable<HttpResponse<string[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
   * retourne la liste des joueurs
   * @return show all player
   */
   joueursGET(): Observable<string[]> {
    return this.joueursGETResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * retourne la liste des joueurs par fb userid
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
   * retourne la liste des joueurs par fb userid
   * @param userid userid FB du joueur
   * @return show one player
   */
   joueurFBGET(userid: string): Observable<joueur> {
    return this.joueurFBGETResponse(userid).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * retourne la liste de tous les matchs
   * @return liste des matchs
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
   * retourne la liste de tous les matchs
   * @return liste des matchs
   */
   matchGET(): Observable<match[]> {
    return this.matchGETResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * enregistre un match
   * @param match details de la partie
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
   * enregistre un match
   * @param match details de la partie
   * @return retourne le match
   */
   matchPUT(match: match): Observable<match> {
    return this.matchPUTResponse(match).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * retourne un match
   * @param id Id de la partie
   * @return list des matchs
   */
   matchIdGETResponse(id: string): Observable<HttpResponse<match>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/match/${id}`,
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
   * retourne un match
   * @param id Id de la partie
   * @return list des matchs
   */
   matchIdGET(id: string): Observable<match> {
    return this.matchIdGETResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * met a jour les données d'un match
   * @param params The `ApiService.MatchIdPUTParams` containing the following parameters:
   *
   * - `match`: details de la partie
   *
   * - `id`: Id de la partie
   *
   * @return retourne le match
   */
   matchIdPUTResponse(params: ApiService.MatchIdPUTParams): Observable<HttpResponse<match>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.match;

    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/match/${params.id}`,
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
   * met a jour les données d'un match
   * @param params The `ApiService.MatchIdPUTParams` containing the following parameters:
   *
   * - `match`: details de la partie
   *
   * - `id`: Id de la partie
   *
   * @return retourne le match
   */
   matchIdPUT(params: ApiService.MatchIdPUTParams): Observable<match> {
    return this.matchIdPUTResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Liste de match joués par un joueur
   * @param nom nom du joueur
   * @return liste des match
   */
   matchJoueurNomGETResponse(nom: string): Observable<HttpResponse<match[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/matchJoueur/${nom}`,
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
   * Liste de match joués par un joueur
   * @param nom nom du joueur
   * @return liste des match
   */
   matchJoueurNomGET(nom: string): Observable<match[]> {
    return this.matchJoueurNomGETResponse(nom).pipe(
      map(_r => _r.body)
    );
  }
}

export module ApiService {

  /**
   * Parameters for joueurPUT
   */
   export interface JoueurPUTParams {

    /**
     * nom du joueur
     */
     nom: string;

    /**
     * details du joueur
     */
     joueur: joueur;
  }

  /**
   * Parameters for matchIdPUT
   */
   export interface MatchIdPUTParams {

    /**
     * details de la partie
     */
     match: match;

    /**
     * Id de la partie
     */
     id: string;
  }
}
