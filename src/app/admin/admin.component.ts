import { Component, OnInit, Input, SimpleChange, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatFormFieldModule, MatSnackBar } from '@angular/material';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// import * as converter from '../InputConverter';

import { ApiService } from '../services';
import { AuthService } from '../auth.service';
import { match, joueur, matchDetailJoueur } from '../models';
import * as moment from 'moment';
import { stringify } from 'querystring';

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
export class AdminComponent implements OnInit {
  // @Input() @converter.InputConverter() joueur: string;
  // @Input() @converter.InputConverter(converter.BooleanConverter) isAdmin  = false;
  // @Input() @converter.InputConverter(converter.BooleanConverter)  isActif = false;
  // @Output() matchModifie = new EventEmitter();
  listeJoueurs: string[];
  joueur: string;

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
  partieFormGroup: FormGroup;

  filteredListeType: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  get joueurFormGroup(): FormArray { return this.partieFormGroup.get('joueur') as FormArray; }

  joueurFormGroupAtIndex(index: number): FormGroup { return this.joueurFormGroup.at(index) as FormGroup; }

  joueurFormControl(index: number, control: string): FormControl {
    return this.joueurFormGroupAtIndex(index).controls[control] as FormControl;
  }

  ngOnInit() {
    this.joueur = this.authService.nom();
    this.apiService.joueursGET()
      .subscribe(joueurs => this.listeJoueurs = joueurs);

    this.initNewMatch();
    this.initFormGroup();

    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('Retrieving match ' + id);
      this.openSnackBar('Chargement du match', '⏳');
      this.partieFormGroup.enable();
      this.getMatch(id);
    } else {
      this.getJoueur(0, this.joueur);
    }
  }

  initFormGroup() {
    this.partieFormGroup = new FormGroup ({
      points: new FormControl(this.match.points, [Validators.min(1)]),
      date: new FormControl(this.match.date, Validators.required),
      derniertour: new FormControl(this.match.derniertour, [Validators.required]),
      type: new FormControl(this.match.type),
      scenario: new FormControl(this.match.scenario),
      joueur: new FormArray([]),
    });

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
     });

    this.filteredListeType = this.partieFormGroup.controls['type'].valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this.filtereListeType(item) : this.listeType.slice())
      );

    for (const index in this.match.joueurs) {
      if (this.match.joueurs[index] !== undefined ) {
        console.log('Creating FormGroup for joueur ' + index + ' - ' + this.match.joueurs[index].nom);
        this.joueurFormGroup.push(
           new FormGroup({
             points: new FormControl(
               this.match.joueurs[index].points,
               [Validators.min(1), this.validateMaxPoints.bind(this)]
             ),
             nom: new FormControl(this.match.joueurs[index].nom, Validators.required),
             score:  new FormControl(
               this.match.joueurs[index].score,
               [Validators.required, Validators.min(0),  Validators.pattern('[0-9]+')]
             ),
             // armee: new FormControl(this.match.joueurs[index].armee, Validators.required),
             vainqueur: new FormControl(this.match.joueurs[index].vainqueur),
             tablerase: new FormControl(this.match.joueurs[index].tablerase),
             abandon: new FormControl(this.match.joueurs[index].abandon),
             briseurdeligne: new FormControl(this.match.joueurs[index].briseurdeligne),
             premiersang: new FormControl(this.match.joueurs[index].premiersang),
             seigneurdeguerre: new FormControl(this.match.joueurs[index].seigneurdeguerre),
           })
         );

          console.log('Setting nom value change ');

        // this.joueurFormGroupAtIndex(+index).controls['nom'].valueChanges.subscribe(
        this.joueurFormControl(+index, 'nom').valueChanges.subscribe(
          value => {
            console.log('Calling getJoueur');
            this.getJoueur(+index, value);
          });
      }
    }
  }

  initNewMatch() {
    console.log('Init new Match');
    this.match = {
      dateentree: moment().format(),
      joueurentree: this.joueur,
      date: moment().format(),
      derniertour: 5,
      points: 1000,
      joueurs: []
    };

    for (const i of [0, 1]){
        this.match.joueurs.push({
          nom: i === 0  ? this.joueur : undefined,
          armee: '',
          points: this.match.points,
          score: 0,
        });
    }
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
      console.log(this.match);
      return;
    }
    this.openSnackBar('Sauvegarde de la partie en cours', '💾');

    this.saveMatch(this.match);
  }

  revert() {
    console.log('Resetting form');
    if (this.match.id === undefined) {
      this.ngOnInit();
    } else {
      this.router.navigate(['/match']);
    }
  }

  saveMatch(match: match): void {
    if (match.id === undefined) {
      console.log('Saving match');
     this.apiService.matchPUT(match)
     .subscribe(match => {
       console.log('Saved match');
       console.log(match);
       this.openSnackBar('Sauvegarde réussie ', '😎');
       // TODO Add snackbarinfo if save incomplete
       // this.revert();
       this.match = match;
       this.initFormGroup();
     },
     error => {
       console.log('oops', error.error);
       this.openSnackBar(error.message, '☠️');
     });
    } else {
      this.apiService.matchIdPUT({match: match, id: match.id})
      .subscribe(match => {
        this.openSnackBar('Mise a jour réussie ', '😎');
        this.match = match;
         this.initFormGroup();
      },
      error => {
         console.log('oops', error.error);
         this.openSnackBar(error.message, '☠️');
      });
    }
  }

  getJoueur(index: number, nom: string): void {
    console.log('Loading joueur ' + nom + ' index: ' + index);
     this.apiService.joueurNomGET(nom)
     .subscribe(joueur => {
       console.log('Get Joueur ' + joueur.nom + ' - ' + joueur.armee);
       this.match.joueurs[index].nom = joueur.nom;
       this.match.joueurs[index].armee = joueur.armee;
       // this.joueurFormControl(index, 'armee').setValue(joueur.armee);
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

  checkJoueur(i: number): boolean {
    return (this.match.joueurs[i].nom === this.joueur) && !this.authService.isAdmin;
  }

  openSnackBar(message: string, action: string, duration?: number) {
  this.snackBar.open(message, action, {
    duration: duration ? duration : 2000,
  });
  }

  getMatch(id: string): void {
    this.apiService.matchIdGET(id)
      .subscribe(match => {
        console.log('got match ' + match.id);
        this.openSnackBar('Match chargé', '', 1);
        this.match = match;
        this.initFormGroup();
        this.partieFormGroup.enable();
      });
  }
}
