/* tslint:disable */
import { joueur } from './joueur';

export interface match {

  /**
   * score du perdant
   */
   scoreperdant?: number;

  /**
   * Date du match
   */
   date?: string;

  perdant?: joueur;

  /**
   * format de la partie
   */
   formatPartie?: string;

  /**
   * nom du scenario joue
   */
   scenario?: string;

  /**
   * nombre de points de la partie
   */
   points?: number;

  /**
   * nombre de PL de la partie
   */
   powerlevel?: number;

  /**
   * score du vainqueur
   */
   scorevainqueur?: number;

  vainqueur?: joueur;

  /**
   * Joueur ayant score briseur de ligne
   */
   briseurligne?: string;

  /**
   * Joueur ayant score premier sang
   */
   premiersang?: string;

  /**
   * Joueur ayant score seigneur de guerre
   */
   seigneurguerre?: string;

  /**
   * la partie se termine par table rase
   */
   tablerase?: boolean;

  /**
   * numero du dernier tour
   */
   derniertour?: number;

  /**
   * nom du joueur qui a entre le match
   */
   joueurentree?: string;

  /**
   * Date d'entree du match
   */
   dateentree?: string;
}
