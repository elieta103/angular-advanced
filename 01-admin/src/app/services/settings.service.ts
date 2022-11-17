import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector("#theme");

  constructor() {
    const urlLocalStorage = localStorage.getItem('url') || "./assets/css/colors/megna-dark.css";
    this.linkTheme?.setAttribute('href', urlLocalStorage);
  }


  changeTheme(theme: string){
    const url =`./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('url', url);

    this.checkCurrentTheme();  //Pone la palomita del CSS seleccionado
  }


  checkCurrentTheme(){
    const links: NodeListOf<Element> = document.querySelectorAll(".selector");

    links.forEach(element =>{
        element.classList.remove('working');  // Remueve el estilo de la seleccion
        const btnTheme = element.getAttribute('data-theme'); //['default','green','red']
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const themeGuardado = localStorage.getItem('url');  // this.linkTheme?.getAttribute('href');
          if(themeGuardado===btnThemeUrl ){
            element.classList.add('working');
          }
    });
  }



}
