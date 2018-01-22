/* tslint:disable */
import { joueur } from './joueur';

export interface match {

  /**
   * score du vainqueur
   */
   scorevainqueur?: number;

  /**
   * Id du match
   */
   id?: string;

  vainqueur?: joueur;

  perdant?: joueur;

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
   * nombre de points de la partie
   */
   points?: number;

  /**
   * nombre de PL de la partie
   */
   powerlevel?: number;

  /**
   * Date du match
   */
   date?: string;

  /**
   * score du perdant
   */
   scoreperdant?: number;

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
