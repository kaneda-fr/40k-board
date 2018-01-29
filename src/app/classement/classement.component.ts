import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { joueur } from '../models';
import { ApiService } from '../services';
import { MessageService } from '../message.service';
import * as converter from '../InputConverter';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit, OnDestroy {
  @Input() @converter.InputConverter() isAdmin: boolean;
  classement: joueur[];
  selectedJoueur: joueur;
  panelOpenState = false;
  classementSubscription: Subscription;

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.getClassememt();
    this.classementSubscription = this.messageService.receiveClassement()
      .subscribe(message => {
        this.getClassememt();
        console.log('New Classemenet Received');
      });
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.classementSubscription.unsubscribe();
  }

  onSelect(joueur: joueur): void {
    this.selectedJoueur = joueur;
  }

 getClassememt(): void {
    this.apiService.classementGET()
      .subscribe(classement => {
        this.classement = classement;
        // this.onSelect(classement[0]);
      });
  }
}
