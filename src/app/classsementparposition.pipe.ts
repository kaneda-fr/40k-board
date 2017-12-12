import { Pipe, PipeTransform } from '@angular/core';
import { joueur } from './models/joueur';

@Pipe({
  name: 'classsementparposition'
})
export class ClasssementparpositionPipe implements PipeTransform {

  transform(classement: joueur[]): joueur[] {
    classement.sort((a: joueur, b: joueur) => {
      if (a.classement < b.classement) {
        return -1;
      } else if (a.classement > b.classement) {
        return 1;
      } else {
        return 0;
      }
    });
    return classement;
  }
}
