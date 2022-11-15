import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  nombreGrafica1:string = "Ventas anuales"
  labelsGrafica1:string[] = ['Download Sales', 'In-Store Sales'];
  dataGrafica1: number[] = [ 200, 300 ];


  nombreGrafica2:string = "Ventas semestrales"
  labelsGrafica2:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Other'];
  dataGrafica2:number[] = [100, 200, 300, 400 ];

  nombreGrafica3:string = "Ventas trimestrales"
  labelsGrafica3:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Other', 'Personal Sales'];
  dataGrafica3: number[] = [100, 200, 300, 400, 500 ];

  nombreGrafica4:string = "Ventas mensuales"
  labelsGrafica4:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  dataGrafica4: number[] = [100, 200, 300 ];

  constructor() { }

  ngOnInit(): void {
  }

}
