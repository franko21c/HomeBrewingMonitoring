import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'cfe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  constructor(private location:Location){}
  ngOnInit() {}

  @Input() title:string ='';
  @Input() defaultHref:string ='';
  @Input() totalCart:number=0
  @Input() showBackBtn:boolean= true;
  @Input() showCloseBtn:boolean= false;
  @Input() showMenuBtn:boolean = false;
  @Input() hidenotification:boolean = true;

  @Output() onCloseClick :EventEmitter<any> = new EventEmitter<any>();
  @Output() cartIconClick:EventEmitter<any> = new EventEmitter<any>();

  goBack(){
    this.location.back();
  }

  goToCart(){
    this.cartIconClick.emit();
  }
  close(){
    this.onCloseClick.emit();
  }


}
