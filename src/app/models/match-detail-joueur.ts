/* tslint:disable */

export interface matchDetailJoueur {

  /**
   * Joueur ayant gagne la partie
   */
   vainqueur?: boolean;

  /**
   * Nom du joueur
   */
   nom: string;

  /**
   * Nombre de points de l'armée du joueur
   */
   points: number;

  /**
   * Armée du joueur
   */
   armee: string;

  /**
   * Nom de l'équipe du joueur
   */
   equipe?: string;

  /**
   * Score du joueur
   */
   score?: number;

  /**
   * Joueur ayant score briseur de ligne
   */
   briseurdeligne?: boolean;

  /**
   * Joueur ayant score seigneur de guerre
   */
   seigneurdeguerre?: boolean;

  /**
   * Joueur ayant score premier sang
   */
   premiersang?: boolean;

  /**
   * Joueur ayant eliminé l'armee adverse
   */
   tablerase?: boolean;

  /**
   * le joueur a concédé le match
   */
   abandon?: boolean;
}
