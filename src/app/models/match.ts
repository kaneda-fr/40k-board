/* tslint:disable */
import { joueur } from './joueur';

/**
 */
export class match {
    date?: string;
    vainqueur?: joueur;
    perdant?: joueur;
    formatPartie?: string;
    scenario?: string;
    points?: number;
    powerlevel?: number;
    scorevainqueur?: number;
    scoreperdant?: number;
}
