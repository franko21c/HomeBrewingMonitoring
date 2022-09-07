import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BeerloaderService } from '../beerloader/beerloader.service';
import { DataService, Rilevameto } from '../services/data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  dataDaVisualizzare= new Date(2016,6,24)
  rilevamenti: Rilevameto[];
  dati: Object;
  getrilevamentiSubscription: Subscription;
  constructor(private berrLoaderService: BeerloaderService,private activatedRoute: ActivatedRoute,private dataService: DataService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.getData();
    this.berrLoaderService.show();
  }

  getData(){
    this.getrilevamentiSubscription =  this.dataService.getRilevamenti(this.dataDaVisualizzare).subscribe(res => {
      this.rilevamenti = res;
      this.cd.detectChanges();
      setTimeout( ()=> this.berrLoaderService.hide(),2000)
     
  
    });
  }

  adddata(){
    this.dataService.getDatafromFile().subscribe(resp=>{
      console.log(resp)
      console.log(resp[0])
      this.dati = resp
      let a   = this.createDataFromFile(resp);
      console.log(this.rilevamenti)
      this.dataService.addNote({"rilevamento":a})

    
    })
  
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getDatafromFile().subscribe(resp=>{
      console.log(resp)
      console.log(resp[0])
      this.dati = resp
      this.rilevamenti  = this.createDataFromFile(resp);
      console.log(this.rilevamenti)
     // this.dataService.addNote({"rilevamento":this.rilevamenti})

    
    })
  }
  dataEntry(from,to){

    for (let index = 0; index < this.rilevamenti.length; index++) {
      const element = this.rilevamenti[index];

     
    
     
      
    }
  }

  createDataFromFile(data){
    let array = [];
    let ril :Rilevameto;
    for (let index = 0; index < data.length; index++) {
      const element = data[index].rilevamento;
      let splitted = element.split(',');
    //  ['25', '6', '2016', '13', '54', '21', '8.37', '52.38', '74.80', '25.60', '0.347', '0.2375']
    //  ril.Data= new Date(splitted[0] +'-'+splitted[1]+'-'+splitted[2])

      array.push({Data:new Date(splitted[2] ,splitted[1],splitted[0],splitted[3],splitted[4],splitted[5]),
        Ph:splitted[6],
        Ts_C:splitted[7],
        Um_percentage:splitted[8],
        Ta_C:splitted[9],
        P_kPa:splitted[10],
        D_Kg_m3:splitted[11],

                
      })
     
    }
    return array;
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'My cool note',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
           // this.dataService.addNote({ text: res.text, title: res.title });
          }
        }
      ]
    });
 
    await alert.present();
  }

 /* async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }
*/
conVertdate(rilevamento){
  return rilevamento.Data.toDate();//new Date(rilevamento.Data).toLocaleDateString("en-US") 
}

addOneDay(){
  var startDate = new Date(this.dataDaVisualizzare);

// seconds * minutes * hours * milliseconds = 1 day 
var day = 60 * 60 * 24 * 1000;

var endDate = new Date(startDate.getTime() + day);

 this.dataDaVisualizzare = endDate;
 this.getrilevamentiSubscription.unsubscribe();
 this.getData();
}

menoOneDay(){
  var startDate = new Date(this.dataDaVisualizzare);

// seconds * minutes * hours * milliseconds = 1 day 
var day = 60 * 60 * 24 * 1000;

var endDate = new Date(startDate.getTime() - day);

 this.dataDaVisualizzare = endDate;
 this.getrilevamentiSubscription.unsubscribe();
 this.getData();

}

}
