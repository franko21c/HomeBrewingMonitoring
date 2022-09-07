import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BeerloaderService } from './beerloader.service';

@Component({
  selector: 'app-beerloader',
  templateUrl: './beerloader.component.html',
  styleUrls: ['./beerloader.component.scss'],
})
export class BeerloaderComponent implements OnInit,OnDestroy {


  showed:Subscription;
  show:boolean = true;
  @Input() backgroundcolor='';

  constructor(private service: BeerloaderService) { 

    if(!this.backgroundcolor){
      this.backgroundcolor='#007575';
    }

  }

  ngOnInit() {
  
   this.showed =this.service.onShow.subscribe(x=>{
      this.show = x;
    });

  }





  ngOnDestroy() {
    this.showed.unsubscribe();
  }

}
