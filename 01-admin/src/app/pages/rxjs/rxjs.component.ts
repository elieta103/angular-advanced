import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {


  public intervalSubs : Subscription;

  constructor() {

    //No pasa nada hasta que alguien se suscriba al Observable.
    /*this.retornaObservable().pipe(
      retry(2)
    ).subscribe({
      next: valor => console.log('Subs : '+valor), //OnNext
      error: err => console.error('Error : '+err),  //OnError
      complete: () => console.log('Complete.') //OnComplete
    });*/

    this.intervalSubs = this.retornaIntervalo().subscribe({
      next: valor => console.log('Subs : '+valor), //OnNext
      error: err => console.error('Error : '+err),  //OnError
      complete: () => console.log('Complete.') //OnComplete
    });

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }


  retornaIntervalo():Observable<number> {
    const intervalo$ = interval(100)
                        .pipe(
                          //take(10),
                          map(i=> i+1),
                          filter(i => i%2===0)
                        );
    return intervalo$;
  }

  retornaObservable(): Observable<number>{
    let i= -1 ;
    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(()=>{
          i++;
          observer.next(i);

          if(i===2){
            observer.error('Emitiendo error.');
          }
          if(i===4){
            clearInterval(interval);
            observer.complete();
          }
        },500);
      });
    return obs$;
  }
}
