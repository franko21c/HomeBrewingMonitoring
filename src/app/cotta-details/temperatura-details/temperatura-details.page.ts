import { AfterViewInit, Component, ElementRef, ViewChild,OnInit, OnDestroy} from '@angular/core';
import Chart from 'chart.js/auto'
import { BeerloaderService } from 'src/app/beerloader/beerloader.service';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-temperatura-details',
  templateUrl: './temperatura-details.page.html',
  styleUrls: ['./temperatura-details.page.scss'],
  providers:[DatePipe]
})
export class TemperaturaDetailsPage implements OnInit, OnDestroy {

  dataDaVisualizzare= new Date(2016,6,26)
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  constructor(private berrLoaderService:BeerloaderService, private dataServices:DataService, private datePipe:DatePipe) { 
   
  }
  ngOnInit() {
  
  }
  ngAfterViewInit() {
    this.caricaDati()
    //this.lineChartMethod();
   
  }



  lineChartMethod(_labels , _tempAmbiente,_tempLiquido) {
    setTimeout( ()=> {this.berrLoaderService.hide() ;},2000)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: _labels,
        datasets: [
          {
            label: 'Temperatura Ambiente',
            fill: false,
            //lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: _tempAmbiente,
            spanGaps: false,
          },
          {
            label: 'Temperatura Liquido',
            fill: false,
            //lineTension: 0.1,
            backgroundColor: '#e7bcbc',
            borderColor: '#c04b4b',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c04b4b',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#e7bcbc',
            pointHoverBorderColor: '#c04b4b',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: _tempLiquido,
            spanGaps: false,
          }

        ]
      },
      options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return  value + ' C°';
                    }
                }
            }
        }
      }
    });
  }

  caricaDati(){
    this.dataServices.getRilevamenti(this.dataDaVisualizzare,9000,'asc').subscribe(resp=>{
      console.log(resp);
      let labels = [];
      let tempAmbiente = [];
      let tempLiquido = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
      
        labels.push(this.conVertdate(element["Data"]));

        
        tempAmbiente.push(parseFloat(element["Ta_C"]).toFixed(2));
        tempLiquido.push(parseFloat(element["Ts_C"]).toFixed(2))
        
      }
      console.log('labels',labels);
      console.log('Ta_C',tempAmbiente);
      console.log('Ts_C',tempLiquido);
     this.lineChartMethod(labels ,tempAmbiente,tempLiquido);
    })  
  
  }

  conVertdate(date){
    return this.datePipe.transform(date.toDate(),"HH:mm:ss");//new Date(rilevamento.Data).toLocaleDateString("en-US") 
  }
  ngOnDestroy(){
    this.lineChart.destroy();
    this.lineCanvas.nativeElement.remove();
  }
}

