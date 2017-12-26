import { Component, OnInit } from '@angular/core';
import { joueur } from '../models';
import { ApiService } from '../services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  classement: joueur[];
  selectedJoueur: joueur;
  panelOpenState = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getClassememt();
    console.log('are we in prod ? ' + environment.production);
  }

  onSelect(joueur: joueur): void {
    this.selectedJoueur = joueur;
  }

 getClassememt(): void {
    this.apiService.classementGET()
      .subscribe(classement => this.classement = classement);
  }
}
