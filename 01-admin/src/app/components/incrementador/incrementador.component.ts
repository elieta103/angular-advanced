import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {



 @Input() progreso : number = 40;
 @Input() btnClass : string = 'btn-primary';

 @Output() valorEmitido : EventEmitter<number> = new EventEmitter();


 ngOnInit(): void {
  this.btnClass = `btn ${this.btnClass}`
}

  get getPorcentaje(){
    return this.progreso+'%';
  }

  cambiarValor(valor: number){
    if(this.progreso >= 100 && valor >= 0 ){
      this.valorEmitido.emit(100);
      this.progreso = 100;
    }else if(this.progreso <= 0 && valor < 0){
      this.valorEmitido.emit(0);
      this.progreso = 0;
    }else{
      this.progreso = this.progreso + valor;
      this.valorEmitido.emit(this.progreso);
    }

  }


  onChange(nuevoValor: number){
    if(nuevoValor>=100){
      this.progreso = 100;
    }else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }

    this.valorEmitido.emit(this.progreso);
  }
}
