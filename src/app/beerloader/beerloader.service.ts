import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeerloaderService {

 
  constructor() { }

  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();


  show(){
    this.onShow.emit(true);
    document.getElementsByTagName('body')[0].style.overflow='hidden';
  }

  hide(){
    this.onShow.emit(false);
    document.getElementsByTagName('body')[0].style.overflow='auto';
  }


}


