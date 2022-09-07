
import { AfterViewInit, Component, ElementRef, ViewChild,OnInit, OnDestroy} from '@angular/core';
import Chart from 'chart.js/auto'
import { BeerloaderService } from 'src/app/beerloader/beerloader.service';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-densita-details',
  templateUrl: './densita-details.page.html',
  styleUrls: ['./densita-details.page.scss'],
  providers:[DatePipe]
})
export class DensitaDetailsPage implements OnInit, OnDestroy {

  dataDaVisualizzare= environment.dataTest
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



  lineChartMethod(_labels , _phdata) {
    setTimeout( ()=> {this.berrLoaderService.hide() ;},2000)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: _labels,
        datasets: [
          {
            label: 'Andamento Densità',
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
            data: _phdata,
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
                        return  value + ' kg/m3';
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
      let phData = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
      
        labels.push(this.conVertdate(element["Data"]));
        phData.push(parseFloat(element["D_Kg_m3"]).toFixed(2));
      
        
      }
      console.log('labels',labels);
      console.log('D_Kg_m3',phData);
     this.lineChartMethod(labels ,phData);
    },error=>{
      this.getLocalData()
    })  
  
  }

  getLocalData(){
    this.dataServices.getDatafromFile().subscribe(resp=>{
      console.log(resp);
      let labels = [];
      let phData = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
      
        labels.push(this.conVertdate(element["Data"]));
        phData.push(element["D_Kg_m3"])
        
      }
      console.log('labels',labels);
      console.log('D_Kg_m3',phData);
     this.lineChartMethod(labels ,phData);

    })
  }

  conVertdate(date){
    return this.datePipe.transform(date.toDate(),"HH:mm:ss");//new Date(rilevamento.Data).toLocaleDateString("en-US") 
  }
  ngOnDestroy(){
    this.lineChart.destroy()
    this.lineCanvas.nativeElement.remove();
  }
}

