import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  declarations: [],
  providers: [
   AuthService
  ],
})
export class AuthModule { }
