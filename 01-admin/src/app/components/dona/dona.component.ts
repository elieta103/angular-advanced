import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{
    // Doughnut
    @Input()
    public nombreGrafica:string='Sin título';
    @Input()
    public doughnutChartLabels: string[]=[];
    @Input()
    public data:number[] =[]


    public doughnutChartData: ChartData<'doughnut'> = {
      labels: [],
      datasets: [{ data: []} ]
    };

    public doughnutChartType: ChartType = 'doughnut';


    // Para fijar los valores de la grafica se debe implementar este metodo.
    // Sino se pasan a la grafica
/*
ngOnChanges vs ngOnInit
ngOnInit gets called only once when the component is initialized.

ngOnChanges gets called before ngOnInit and whenever a component's bound input is changed FROM THE PARENT COMPONENT.
Remember that ngOnChanges is specific to bound inputs on the component.
This means if you don't have any @Input properties on a child, ngOnChanges will never get called.

ngOnInit is specific to the component being initialized.
ngOnChanges is specific to @Input properties on a child component.

When should you use ngOnChanges?
Use ngOnChanges whenever you want to detect changes from a variable decorated by @Input.
Remember that only changes from the parent component will trigger this function.
*/

    ngOnChanges(changes: SimpleChanges): void {
      this.doughnutChartData={
        labels: this.doughnutChartLabels,
        datasets:[{ data: this.data}]
      }
    }

}
