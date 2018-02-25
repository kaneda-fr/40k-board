import * as Rollbar from 'rollbar';
import {
  Injectable,
  Injector,
  InjectionToken,
  NgModule,
  ErrorHandler
} from '@angular/core';

import { environment } from '../environments/environment';

const rollbarConfig = {
  accessToken: environment.rollbarToken,
  captureUncaught: environment.rollbarEnabled,
  captureUnhandledRejections: environment.rollbarEnabled,
  enabled: environment.rollbarEnabled,
  payload: {
    environment: environment.production ? 'production' : 'development'
  },
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');


@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}


@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory },
  ]
})

export class RollbarModule { }

