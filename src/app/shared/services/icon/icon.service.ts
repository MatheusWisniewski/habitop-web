import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  getMatColor(color: string): string {
    return this.convert(color).color;
  }

  getClass(color: string): string {
    return this.convert(color).class;
  }

  convert(color: string) {
    switch (color) {
      case 'green': return {
        class: '',
        color: 'primary'
      };
      case 'red': return {
        class: '',
        color: 'warn'
      };
      case 'blue': return {
        class: '',
        color: 'accent'
      };
      case 'yellow': return {
        class: 'alternate-theme',
        color: 'primary'
      };
      case 'purple': return {
        class: 'alternate-theme',
        color: 'accent'
      };
      case 'orange': return {
        class: 'alternate-theme',
        color: 'warn'
      };
      case 'gray': return {
        class: 'gray-theme',
        color: 'warn'
      };
      default: return {
        class: '',
        color: ''
      };
    }
  }
}
