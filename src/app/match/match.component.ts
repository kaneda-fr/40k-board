import { Component, ViewChild, OnInit, Input,  AfterViewInit, OnChanges, SimpleChange, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { joueur, match } from '../models';
import { ApiService } from '../services';
import * as converter from '../InputConverter';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnChanges, AfterViewInit {
  @Input() @converter.InputConverter() joueur: string;
  @Input() @converter.InputConverter() isAdmin: boolean;
  matches: match[];
  data: DataRow[];
  dataSource = new MatTableDataSource<DataRow>(this.data);
  displayedColumns = ['date', 'points', 'resultat', 'armee', 'adversaire', 'armeeAdverse'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   constructor(private apiService: ApiService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (this.isAdmin === true && this.displayedColumns.indexOf('action') === -1) {
      this.displayedColumns.push('action');
    }

    const joueur = changes['joueur'];
    if (joueur !== undefined) {
      console.log('change ' + joueur.currentValue);
      this.getMatch(joueur.currentValue);
    }
  }

   getMatch(nom?: string): void {
    this.apiService.matchJoueurNomGET(nom)
     .subscribe(res => {
       // this.matches = res.length === undefined ? [] : res;
       const mydata = new Array();
       let indexJoueur: number;
       let indexAdversaire: number;

       for (const match of res) {
        let row: DataRow;
         indexJoueur = match.joueurs[0].nom === this.joueur ? 0 : 1;
         indexAdversaire = match.joueurs[0].nom === this.joueur ? 1 : 0;

         row = <DataRow>{};
         row.date = match.date;
         row.resultat = match.joueurs[indexJoueur].vainqueur ? 'gagné' : (match.joueurs[indexAdversaire].vainqueur ? 'perdu' : 'égalité');
         row.adversaire = match.joueurs[indexAdversaire].nom;
         row.armeeAdverse = match.joueurs[indexAdversaire].armee;
         row.points = match.points;
         row.armee = match.joueurs[indexJoueur].armee;
         mydata.push(row);
        }
       this.dataSource = new MatTableDataSource<DataRow>(mydata);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.changeDetectorRefs.detectChanges();
     });
  }
}

export interface DataRow {
  date: string;
  points: number;
  adversaire: string;
  armeeAdverse: string;
  armee: string;
  resultat: string;
}
