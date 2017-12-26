import { Component, OnInit, Input } from '@angular/core';
import { joueur } from '../models';
import { ApiService } from '../services';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {
  @Input() nom: string;
  joueur: joueur[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getJoueur(this.nom);
  }

   getJoueur(nom?: string): void {
    console.log('Loading Joueur ' + nom);
     this.apiService.joueurNomGET(nom)
     .subscribe(joueur => this.joueur = joueur);
  }

}
