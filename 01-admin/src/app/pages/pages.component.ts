import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})


export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    //Forza la recarga/llamada de las funciones de JQuery en assets/js/custom.js
    customInitFunctions();
  }



}
