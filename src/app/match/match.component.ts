import { Component, OnInit, Input,  OnChanges, SimpleChange} from '@angular/core';
import { joueur, match } from '../models';
import { ApiService } from '../services';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnChanges {
  @Input() joueur: string;
  matches: match[];

   constructor(private apiService: ApiService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const joueur = changes['joueur'];
    console.log('change ' + joueur.currentValue);

    this.getMatch(joueur.currentValue);
  }

   getMatch(nom?: string): void {
    this.apiService.matchJoueurNomGET(nom)
     .subscribe(match => {
       this.matches = match.length === undefined ? [] : match;
       console.log(JSON.stringify(match));
     });
  }
}
