import { Component, OnInit, Input,  OnChanges, SimpleChange } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnChanges {
  @Input() joueur: string;
  nomJoueur: string;

  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const joueur = changes['joueur'];
    console.log('user logged in: ' + joueur.currentValue);
    this.nomJoueur = joueur.currentValue;
  }
}
