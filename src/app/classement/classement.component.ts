import { Component, OnInit } from '@angular/core';
import { joueur } from '../models/joueur';
import { ApiClientService } from '../api.service';

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
  }

  onSelect(joueur: joueur): void {
    this.selectedJoueur = joueur;
  }

 getClassememt(): void {
    this.apiClientService.getClassement()
      .subscribe(classement => this.classement = classement);
  }
}
