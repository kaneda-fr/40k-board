/* tslint:disable */
import { matchDetailJoueur } from './match-detail-joueur';

export interface match {

  /**
   * nombre de points de la partie
   */
   points?: number;

  /**
   * Id du match
   */
   id?: string;

  /**
   * Date du match
   */
   date: string;

  /**
   * format de la partie
   */
   formatPartie?: string;

  /**
   * type de match
   */
   type?: string;

  /**
   * nom du scenario joue
   */
   scenario?: string;

  /**
   * Nom du tournoi
   */
   tournoi?: string;

  /**
   * nombre de PL de la partie
   */
   powerlevel?: number;

  /**
   * numero du dernier tour
   */
   derniertour: number;

  /**
   * nom du joueur qui a entre le match
   */
   joueurentree: string;

  /**
   * Date d'entree du match
   */
   dateentree: string;

  joueurs?: matchDetailJoueur[];
}
