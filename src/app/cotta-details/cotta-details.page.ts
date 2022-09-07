import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
import { environment } from 'src/environments/environment';
import { BeerloaderService } from '../beerloader/beerloader.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cotta-details',
  templateUrl: './cotta-details.page.html',
  styleUrls: ['./cotta-details.page.scss'],
})
export class CottaDetailsPage implements OnInit, OnDestroy {

  dataDaVisualizzare= environment.dataTest
  constructor(private berrLoaderService:BeerloaderService, private dataServices:DataService) { 
  
  }
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  ngOnInit() {
 
  }
  ngAfterViewInit() {
    this.caricaDati()
  
   // this.doughnutChartMethod();
    
  }

  doughnutChart: any;
  doughnutChartMethod(_data) {
    setTimeout( ()=>  this.berrLoaderService.hide() ,2000)
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['pH', 'Temperatura Liquido C°', 'Umidità (%)', 'Temperatura Ambiente (C°)', 'Pressione (kPa)','Densità (kg/m3)'],
        datasets: [{
          label: '# of Votes',
          data: [_data['Ph'], _data['Ts_C'], _data['Um_percentage'], _data['Ta_C'], _data['P_kPa'],_data['D_Kg_m3']],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 99, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#FF9344'
          ]
        }]
      }
    });
  
  }


  caricaDati(){
   
    this.dataServices.getRilevamenti(this.dataDaVisualizzare).subscribe(resp=>{
      console.log(resp);
      this.doughnutChartMethod(resp[0])
    },error=>{
      this.getLocalData()
    })  
  
  }

  getLocalData(){
    this.dataServices.getDatafromFile().subscribe(resp=>{
      console.log(resp);
   
     this.doughnutChartMethod(resp[0]);

    })
  }
  ngOnDestroy(){
    this.doughnutChart.destroy();
    this.doughnutCanvas.nativeElement.remove();
  }
}
