import { Component, OnInit, Input,  OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatFormFieldModule, MatSnackBar } from '@angular/material';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import * as converter from '../InputConverter';

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
  @Input() @converter.InputConverter() joueur: string;
  @Input() @converter.InputConverter(converter.BooleanConverter) isAdmin  = false;
  @Input() @converter.InputConverter(converter.BooleanConverter)  isActif = false;
  @Output() matchModifie = new EventEmitter();
  nomJoueur: string;
  listeJoueurs: string[];

  listeArmees =  ['Adeptus Custodes', 'Adeptus Mechanicus', 'Adeptus Ministorum', 'Astra Militarum',
    'Blood Angels', 'Chaos Daemons', 'Chaos Space Marines', 'Craftworlds', 'Dark Angels',
    'Death Guard', 'Deathwatch', 'Drukhari', 'Genestealer Cults', 'Grey Knights', 'Harlequins',
    'Necrons', 'Officio Assassinorum', 'Orks', 'Questor Imperialis', 'Questor Traitoris',
    'Sisters of Silence', 'Space Marines', 'Space Wolves', 'Tau Empire', 'The Inquisition',
    'Thousand Sons', 'Tyranids', 'Ynnari'];
  listeType = [
   {
      type: 'Match Play',
      scenario: ['Match Play']
    },
    {
      type: 'Open Play',
      scenario: ['Open Play']
    },
    {
      type: 'Maelstrom of War',
      scenario: [
        'Mort Confirmée', 'Cibles d\'Opportunités', 'Tour de Force tactique',
        'Course à la Victoire', 'Ordres Scellés', 'Reconnaissance'
      ]
    },
    {
      type: 'Eternal War',
      scenario: ['Largage de Ravitaillement', 'Terre Calcinée', 'Dominer et Détruire', 'Ascension', 'Patrouille Volante']
    },
    {
      type: 'Fat of War',
      scenario: [
        'S1: Largage de Ravitaillement | Mort confirmé',
        'S2: La Relique | Ordre Scellée',
        'S3: Xenocide | Cibles d\'opportunité']
    },
    ];

  match: match;
  /*joueur1: joueur;
  joueur2: joueur;*/
  partieFormGroup: FormGroup;

  // joueurFormGroup: FormGroup[];
  filteredListeType: Observable<any[]>;

  // constructor(private apiService: ApiService, private match: match, private joueur1: match, private joueur2: match) { }
  constructor(private apiService: ApiService, public snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

  get joueurFormGroup(): FormArray { return this.partieFormGroup.get('joueur') as FormArray; }

  joueurFormGroupAtIndex(index: number): FormGroup { return this.joueurFormGroup.at(index) as FormGroup; }

  joueurFormControl(index: number, control: string): FormControl {
    return this.joueurFormGroupAtIndex(index).controls[control] as FormControl;
  }

  ajouteJoueur() {
    const index = this.match.joueurs.length;

    this.match.joueurs.push(
      {
        nom: '',
        armee: '',
        points: this.match.points,
        score: 0,
      }
    );

   this.joueurFormGroup.push(
     new FormGroup({
       points: new FormControl(
         this.match.points,
         [Validators.min(1), this.validateMaxPoints.bind(this)]
       ),
       nom: new FormControl(),
       score:  new FormControl(0, [Validators.required, Validators.min(0),  Validators.pattern('[0-9]+')]),
       vainqueur: new FormControl(),
       tablerase: new FormControl(),
       abandon: new FormControl(),
       briseurdeligne: new FormControl(),
       premiersang: new FormControl(),
       seigneurdeguerre: new FormControl(),
     })
   );

  this.joueurFormGroupAtIndex(index).get('nom').valueChanges.subscribe(
    value => {
      this.getJoueur(index, value);
    }
  );

  }

  ngOnInit() {
    this.match = {
      dateentree: moment().format(),
      joueurentree: this.nomJoueur,
      date: moment().format(),
      derniertour: 5,
      points: 1000,
      joueurs: []
    };

    this.partieFormGroup = new FormGroup ({
      points: new FormControl(this.match.points, [Validators.min(1)]),
      date: new FormControl(null, Validators.required),
      derniertour: new FormControl(5, [Validators.required]),
      type: new FormControl(),
      scenario: new FormControl(),
      joueur: new FormArray([]),
    });

    if (this.match.joueurs.length === 0) {
      for (const i of [1, 2]){
        this.ajouteJoueur();
      }
    }
    this.match.joueurs[0].nom = this.joueur;

    this.partieFormGroup.controls['points'].valueChanges.subscribe(
      value => {
        this.match.joueurs.forEach(function(joueur, index) {
          this.joueurFormGroup.at(index).controls['points'].markAsTouched();
          this.joueurFormGroup.at(index).controls['points'].updateValueAndValidity();
        }, this);
      }
    );

   this.partieFormGroup.controls['scenario'].valueChanges.subscribe(
      value => {
        if (value === undefined) {
          this.partieFormGroup.controls['type'].setValue(undefined);
          return;
         }
        for (const item of this.listeType){
          for (const scenario of item.scenario){
            if (scenario === value) {
              // this.match.type = item.type;
              this.partieFormGroup.controls['type'].setValue(item.type);
              return; // Exit as soon as we found a matching entry
            }
          }
        }
     }
    );

    this.filteredListeType = this.partieFormGroup.controls['type'].valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this.filtereListeType(item) : this.listeType.slice())
      );

      this.joueurFormGroupAtIndex(0).controls['nom'].setValue(this.joueur);
      // this.match.joueurs[0].nom = this.joueur;
      // this.joueurFormGroupAtIndex(0).updateValueAndValidity();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const joueur = changes['joueur'];
    console.log('user logged in: ' + joueur.currentValue);
    this.nomJoueur = joueur.currentValue;
    this.apiService.joueursGET()
      .subscribe(joueurs => this.listeJoueurs = joueurs);
  }

  filtereListeType(name: string) {
  return this.listeType.filter(item =>
    item.type.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

 validateMaxPoints(c: FormControl): { [key: string]: boolean } {
    return (c.value <= this.match.points) ? null : {
      validateMaxPoints: true
      };
  }

  getPointsErrorMessage(index: number) {
  if (this.joueurFormGroupAtIndex(index).get('points').value < 1 ) {
     return 'le nombre de points doit etre superieur a 0';
  } else {
      return 'le nombre de points doit etre inferieur a ' + this.partieFormGroup.get('points').value;
    }
  }

  onSubmit() {
    /*console.log(this.partieFormGroup.value);
    console.log(this.match);*/
    this.partieFormGroup.updateValueAndValidity();
    // console.log('pristine; ' + this.partieFormGroup.pristine);
    if (this.partieFormGroup.invalid) {
      console.log('form is invalid');
      return;
    }
    this.openSnackBar('Sauvegarde de la partie en cours', '👾');

    this.saveMatch(this.match);
  }

  revert() {
    console.log('Resetting form');
    this.ngOnInit();
  }

  saveMatch(match: match): void {
    console.log('Saving match');
     this.apiService.matchPUT(match)
     .subscribe(match => {
       /*console.log('Saved match');
       console.log(JSON.stringify(match));*/
       this.openSnackBar('Sauvegarde réussie ' + match.id, '😎');
       // TODO Add snackbarinfo if save incomplete
       this.revert();
       console.log('emit');
       this.matchModifie.emit('matchmodifie');
     },
     error => {
       console.log('oops', error.error);
       this.openSnackBar(error.message, '☠️');
     });
  }

  getJoueur(index: number, nom: string): void {
    console.log('Loading joueur ' + nom);
     this.apiService.joueurNomGET(nom)
     .subscribe(joueur => {
       this.match.joueurs[index].nom = joueur.nom;
       this.match.joueurs[index].armee = joueur.armee;
       this.match.joueurs[index].points = this.match.points;
     });
  }

  updateUniqueCheckedOptions(index: number, property: string, event) {
    if (event) {
      this.match.joueurs.forEach(function(joueur, i) {
        if (i !== index) {
          this.joueurFormGroupAtIndex(i).controls[property].setValue(false);
        }
        if (property === 'vainqueur' && index === i) {
          this.joueurFormGroupAtIndex(i).controls['abandon'].setValue(false);
        }
        if (property === 'vainqueur' && index !== i) {
          this.joueurFormGroupAtIndex(i).controls['tablerase'].setValue(false);
        }
        if (property === 'tablerase' && joueur.abandon === true) {
           this.joueurFormGroupAtIndex(i).controls['abandon'].setValue(false);
        }
        if (property === 'abandon' && index !== i) {
           this.joueurFormGroupAtIndex(i).controls['vainqueur'].setValue(true);
        }
        if (property === 'tablerase' && index === i) {
          this.joueurFormGroupAtIndex(i).controls['vainqueur'].setValue(true);
        }
        if (property === 'abandon') {
          this.joueurFormGroupAtIndex(i).controls['tablerase'].setValue(false);
        }

      }, this);
    }
  }

  checkNomUsed(nom: string, index: number): boolean {
    let i = 0;
    for (const joueur of this.match.joueurs){
      if (joueur.nom === nom) {
        return i === index ? false : true;
      }
      i++;
    }
    return false;
  }

  openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
  }
}
