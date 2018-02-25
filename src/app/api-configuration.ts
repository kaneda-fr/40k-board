/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = environment.production ? "https://hackedo.io/40k/api" : "http://localhost:8081/40k/api";
}
