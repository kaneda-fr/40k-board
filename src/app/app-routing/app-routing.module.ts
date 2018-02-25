import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { AdminComponent } from '../admin/admin.component';
import { StatsComponent } from '../stats/stats.component';
import { ReglementComponent } from '../reglement/reglement.component';
import { ClassementComponent } from '../classement/classement.component';
import { CreejoueurComponent } from '../creejoueur/creejoueur.component';

import { environment } from '../../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: '/classement', pathMatch: 'full' },
  { path: 'classement', component: ClassementComponent },
  { path: 'reglement', component: ReglementComponent },
  { path: 'match/:id', component: AdminComponent },
  { path: 'match', component: AdminComponent, canActivate: [AuthguardService], },
  { path: 'stats', component: StatsComponent },
  { path: 'login', component: CreejoueurComponent, outlet: 'popup' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(
    routes,
    {
      enableTracing: ! environment.production,
     })
  ],
})

export class AppRoutingModule { }
