import { Component, OnInit } from '@angular/core';
import { joueur } from '../models/joueur';
import { ApiClientService } from '../api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  classement: joueur[];
  selectedJoueur: joueur;

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit() {
    this.getClassememt();
    console.log('prod ? ' + environment.production);
  }

  onSelect(joueur: joueur): void {
    this.selectedJoueur = joueur;
  }

 getClassememt(): void {
    this.apiClientService.getClassement()
      .subscribe(classement => this.classement = classement);
  }
}
