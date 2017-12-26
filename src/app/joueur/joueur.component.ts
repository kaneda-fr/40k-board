import { Component, OnInit } from '@angular/core';
import { joueur } from '../models';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  joueur: joueur;

  constructor() { }

  ngOnInit() {
  }

}
