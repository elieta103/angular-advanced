import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  public tituloSubs$ : Subscription;

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(event => {
      this.titulo = event['titulo'];
      document.title = `AdminPro - ${this.titulo}`
    });
  }


  getArgumentosRuta(){
    return this.router.events.pipe(
      filter( (item:any) => item instanceof ActivationEnd),
      filter( (item : ActivationEnd) => item.snapshot.firstChild===null ),
      map ( (item : ActivationEnd) => item.snapshot.data)
    );
  }

}
