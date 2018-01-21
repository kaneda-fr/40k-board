import { Component, OnInit, Input,  OnChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material';
import { ApiService } from '../services';
import { match, joueur } from '../models';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AdminComponent implements OnChanges, OnInit {
  @Input() joueur: string;
  @Input() userId: string;
  @Input() accessToken: string;
  @Input() isAdmin: Boolean;
  nomJoueur: string;
  listeJoueurs: string[];
  picker1: string;
  heurePartie: number;
  minutesPartie: number;

  listeArmees =  ['Adeptus Custodes', 'Adeptus Mechanicus', 'Adeptus Ministorum', 'Astra Militarum',
    'Blood Angels', 'Chaos Daemons', 'Chaos Space Marines', 'Craftworlds', 'Dark Angels',
    'Death Guard', 'Deathwatch', 'Drukhari', 'Genestealer Cults', 'Grey Knights', 'Harlequins',
    'Necrons', 'Officio Assassinorum', 'Orks', 'Questor Imperialis', 'Questor Traitoris',
    'Sisters of Silence', 'Space Marines', 'Space Wolves', 'Tau Empire', 'The Inquisition',
    'Thousand Sons', 'Tyranids', 'Ynnari'];
  listeScenario = ['S1', 'S2'];

  match: match;
  joueur1: joueur;
  joueur2: joueur;
  partie: FormGroup;

  // constructor(private apiService: ApiService, private match: match, private joueur1: match, private joueur2: match) { }
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.match = {};
    this.match.points = 1000;
    this.joueur1 = {};
    this.getJoueur('joueur1', this.nomJoueur);
    this.joueur2 = {};
    this.joueur2.points = this.match.points;
    this.match.date = moment().format();
    this.heurePartie = 1 ;
    this.minutesPartie = 1;


    this.partie = new FormGroup ({
      points: new FormControl(this.match.points, [Validators.min(1)]),
      pointsJ1: new FormControl(0, [Validators.min(1), this.validateMaxPoints.bind(this)]),
      pointsJ2: new FormControl(0, [Validators.min(1), this.validateMaxPoints.bind(this)]),
      nomJ1: new FormControl(this.nomJoueur),
      nomJ2: new FormControl(),
      date: new FormControl(null, Validators.required)
    });

    this.partie.controls['points'].valueChanges.subscribe(
      value => {
        this.partie.controls['pointsJ1'].markAsTouched();
        this.partie.controls['pointsJ1'].updateValueAndValidity();
        this.partie.controls['pointsJ2'].markAsTouched();
        this.partie.controls['pointsJ2'].updateValueAndValidity();
      }
    );

    this.partie.controls['nomJ1'].valueChanges.subscribe(
      value => {
        this.getJoueur('joueur1', value);
      }
    );
    this.partie.controls['nomJ2'].valueChanges.subscribe(
      value => {
        this.getJoueur('joueur2', value);
      }
    );

    this.partie.controls['points'].markAsTouched();
    this.partie.controls['points'].updateValueAndValidity();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('Is Admin: ' + this.isAdmin);
    const joueur = changes['joueur'];
    console.log('user logged in: ' + joueur.currentValue);
    this.nomJoueur = joueur.currentValue;
    this.apiService.joueursGET(this.accessToken)
      .subscribe(joueurs => this.listeJoueurs = joueurs);
  }

 validateMaxPoints(c: FormControl): { [key: string]: boolean } {
    return (c.value <= this.match.points) ? null : {
      validateMaxPoints: true
      };
  }

  getPointsErrorMessage(joueur: string) {
    if (!joueur.localeCompare('J1')) {
      if (this.partie.get('pointsJ1').value < 1 ) {
        return 'le nombre de points doit etre superieur a 0';
      } else {
        return 'le nombre de points doit etre inferieur a ' + this.partie.get('points').value;
      }
    } else {
      if (this.partie.get('pointsJ2').value < 1 ) {
        return 'le nombre de points doit etre superieur a 0';
      } else {
        return 'le nombre de points doit etre inferieur a ' + this.partie.get('points').value;
      }
    }

    /*return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';*/
  }

  onSubmit() {
    this.partie.controls['date'].updateValueAndValidity();
    console.log('pristine; ' + this.partie.pristine);
    if (this.partie.invalid) {
      console.log('form is invalid');
    }
    // console.log(JSON.stringify(this.joueur1));
    // console.log(JSON.stringify(this.joueur2));
    this.match.vainqueur = this.joueur1;
    this.match.perdant = this.joueur2;
    console.log(JSON.stringify(this.match));
  }

  revert() {  console.log('Resetting form'); }

  getJoueur(joueurSelect: string, nom: string): void {
    console.log('Loading ' + joueurSelect + ' ' + nom);
     this.apiService.joueurNomGET(nom)
     .subscribe(joueur => {
       this[joueurSelect] = joueur;
       this[joueurSelect].points = this.match.points;
     });
  }
}
