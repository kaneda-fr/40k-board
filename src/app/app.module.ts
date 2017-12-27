import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MatchComponent } from './match/match.component';
import { JoueurComponent } from './joueur/joueur.component';
import { ClassementComponent } from './classement/classement.component';
import { ClasssementparpositionPipe } from './classsementparposition.pipe';

import { FacebookModule } from 'ngx-facebook';

/**
 * Module that provides instances for all API services
 */
import { ApiModule } from './api.module';

import { MaterialModule } from './material.module';
import { StatsComponent } from './stats/stats.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    JoueurComponent,
    ClassementComponent,
    ClasssementparpositionPipe,
    StatsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
    MaterialModule,
    FacebookModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
