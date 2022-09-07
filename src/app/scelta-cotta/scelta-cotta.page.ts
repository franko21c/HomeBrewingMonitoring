import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeerloaderService } from '../beerloader/beerloader.service';

@Component({
  selector: 'app-scelta-cotta',
  templateUrl: './scelta-cotta.page.html',
  styleUrls: ['./scelta-cotta.page.scss'],
})
export class SceltaCottaPage implements OnInit{

  constructor(private berrLoaderService:BeerloaderService) { }

  ngOnInit() {
    setTimeout( ()=> this.berrLoaderService.hide(),2000)

  }



}
