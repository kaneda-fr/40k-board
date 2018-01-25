/* tslint:disable */

export interface joueur {

  /**
   * indique si le joueur est admin
   */
   admin?: boolean;

  /**
   * Nom du Joueur
   */
   nom: string;

  /**
   * classement du joueur
   */
   classement?: number;

  /**
   * nombre de parties disputees
   */
   parties?: number;

  /**
   * userID facebook
   */
   fbuserid?: string;

  /**
   * Armee principale du joueur
   */
   armee: string;

  /**
   * indique si le compte est actif
   */
   actif?: boolean;

  /**
   * date de creation du joueur
   */
   datecreation?: string;

  /**
   * Nombre de  points joues
   */
   points?: number;

  /**
   * Adresse mail du joueur
   */
   email?: string;

  /**
   * Nom du joueur dans FB
   */
   fbname?: string;
}
