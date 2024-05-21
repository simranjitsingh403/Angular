import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() { }

  focusInvalidElements(element : any){
    if (element) {
      const panel = element.closest('.accordion-collapse');

      if (panel) {
          if (!panel.classList.contains('show')) {
            panel.classList.add('show');
          }
      }

      if (element.tagName.toLowerCase() === 'ng-select') {
        const inputElement = element.querySelector('input');
        if (inputElement) {
          inputElement.focus();
        }
      } else {
        element.focus();
      }
    }
  }
}
