import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.simplePromise(false);
    this.getUsuarios().then(usuarios => console.log(usuarios))
  }


  getUsuarios () {

    const promesa = new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data));

    });

  return promesa;

  }

  simplePromise(value: boolean){
    const promesa = new Promise( (resolve,reject) => {
      if(value){
        resolve('Exito,  Desde el resolve....');
      }else{
        reject('Error, Desde del reject....');
      }

    } );

    promesa.then( (msg)=>{
            console.log(msg +' Termino la promesa exito!!');
         }).catch( (err) => {
            console.log(err+' Termino la promesa error!!');
        });

    console.log('Fuera promesa')

  }

}
