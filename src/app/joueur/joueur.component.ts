import { Component, OnInit } from '@angular/core';
import { joueur } from '../models/joueur';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  joueur: joueur = {
    nom: 'Seb',
    armee: 'T\'au',
    classement: 1,
    parties: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
