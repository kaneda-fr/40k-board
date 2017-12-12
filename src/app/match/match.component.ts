import { Component, OnInit, Input,  OnChanges, SimpleChange} from '@angular/core';
import { match } from '../models/match';
import { ApiClientService } from '../api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnChanges {
  @Input() joueur: string;
  matches: match[];

  constructor(private apiClientService: ApiClientService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const joueur = changes['joueur'];
    console.log('change ' + joueur.currentValue);

    this.getMatch(joueur.currentValue);
  }

   getMatch(nom?: string): void {
    this.apiClientService.getMatch(nom)
     .subscribe(match => this.matches = match);
  }
}
