/* tslint:disable */
import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { joueur, match, Error } from 'models';
import { joueur } from './models/joueur';
import { match } from './models/match';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({  
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, X-Codingpedia,Authorization'
    })
};

@Injectable()
/**
 * Created with angular2-swagger-client-generator v
 */
export class ApiClientService {
	domain:string;
  
  constructor(public http: HttpClient){
    this.domain = 'http://hackedo.io/40k/api';
  }
  /*
	constructor(public http: Http, options?: any) {
		var domain = (typeof options === 'object') ? options.domain : options;
		this.domain = typeof(domain) === 'string' ? domain : 'https://hackedo.io/40k/api';
		
		if(this.domain.length === 0) {
			throw new Error('Domain parameter must be specified as a string.');
		}
		
	}
  */


	/**
  *
	* @method
	* @name getClassement
	* @param {string} date - date du classement
	* 
	*/
	/*public getClassement(date: string): Observable<joueur[]> {*/
  public getClassement(): Observable<joueur[]> {
		/*let payload = {};	
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');*/
		
      
		/*if(date !== undefined){
			queryParameters['date'] = date;
		}*/
			
		let uri = `/classement`;
	  
		return this.http
    .get<joueur[]>(this.domain + uri);
			/*.get<joueur[]>(this.domain + uri, { headers: headers, params: queryParameters })*/
       /* .get<joueur[]>(this.domain + uri, httpOptions);
			/*.map((res: Response) => {
        return res;
      })*/
	}
	
	/**
  *
	* @method
	* @name getJoueurByNom
	* @param {string} nom - nom du joueur
	* 
	*/
	/*public getJoueurByNom(nom: string) {
		let payload = {};	
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
			
		let uri = `/joueur/${nom}`;
	  
		return this.http
			.get(this.domain + uri, { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}*/
	
	/**
  *
	* @method
	* @name getMatch
	* 
	*/
	public getMatch(nom?: string): Observable<match[]>{
		let uri = `/match`;
    
    if(nom !== undefined){
      uri += 'joueur/' + nom;
    }
	  
		return this.http
			.get<match[]>(this.domain + uri);
	}
	
	/**
  *
	* @method
	* @name putMatch
	* @param {string} vainqueur - nom du vainqueur
	* @param {string} perdant - nom du perdant
	* @param {string} date - Date du match
	* 
	*/
  /*
	public putMatch(vainqueur: string, perdant: string, date: string) {
		let payload = {};	
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
      
		if(parameters['vainqueur'] !== undefined){
			queryParameters['vainqueur'] = parameters['vainqueur'];
		}
			
      
		if(parameters['perdant'] !== undefined){
			queryParameters['perdant'] = parameters['perdant'];
		}
			
      
		if(parameters['date'] !== undefined){
			queryParameters['date'] = parameters['date'];
		}
			
		let uri = `/match`;
	  
		return this.http
			.put(this.domain + uri, JSON.stringify(), { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}
   */
	

}
