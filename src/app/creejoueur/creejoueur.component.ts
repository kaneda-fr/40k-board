import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule, MatSnackBar } from '@angular/material';

import { ApiService } from '../services';
import { joueur } from '../models';

@Component({
  selector: 'app-creejoueur',
  templateUrl: './creejoueur.component.html',
  styleUrls: ['./creejoueur.component.css']
})
export class CreejoueurComponent implements OnInit {
  @Input() userId: string;
  @Input() fbName: string;
  @Output() joueurModifie = new EventEmitter();
  joueur: joueur;
  joueurForm: FormGroup;

    listeArmees =  ['Adeptus Custodes', 'Adeptus Mechanicus', 'Adeptus Ministorum', 'Astra Militarum',
    'Blood Angels', 'Chaos Daemons', 'Chaos Space Marines', 'Craftworlds', 'Dark Angels',
    'Death Guard', 'Deathwatch', 'Drukhari', 'Genestealer Cults', 'Grey Knights', 'Harlequins',
    'Necrons', 'Officio Assassinorum', 'Orks', 'Questor Imperialis', 'Questor Traitoris',
    'Sisters of Silence', 'Space Marines', 'Space Wolves', 'Tau Empire', 'The Inquisition',
    'Thousand Sons', 'Tyranids', 'Ynnari'];

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private apiService: ApiService, public snackBar: MatSnackBar  ) { }

  ngOnInit() {
    this.joueur = {};

    this.joueurForm = new FormGroup ({
      points: new FormControl(1000, [Validators.min(1), Validators.required]),
      nom: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    });
  }

  onSubmit() {
    this.joueur.fbuserid = this.userId;
    this.joueur.fbname = this.fbName;
    console.log(JSON.stringify(this.joueur));

    this.openSnackBar('Sauvegarde en cours', '👾');
    this.saveJoueur(this.joueur);

  }

  saveJoueur(joueur: joueur): void {
    console.log('Enregistrement joueur');
     this.apiService.joueurPUT(joueur)
     .subscribe(joueur => {
       console.log('Joueur enregistré');
       console.log(JSON.stringify(joueur));
       this.joueurModifie.emit(this.joueur.nom);
     },
     error => {
       console.log('oops', error.error);
       this.openSnackBar(error.message, '☠️');
     });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

