import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, collectionData, collectionGroup,doc, docData, addDoc, deleteDoc, updateDoc,query,where,getDocs, orderBy} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import {map } from 'rxjs/operators';  
import { limit, OrderByDirection } from 'firebase/firestore';
 
export interface Rilevameto {
  id?:string,
  Data:Date   
  Ph:string,
  Ts_C:string,
  Um_percentage:string,
  Ta_C:string,
  P_kPa:string,
  D_Kg_m3:string
}
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private firestore: Firestore, private http: HttpClient) { }
 
  getRilevamenti(_dataDaVisualizzare, _limit = 1, _orderBy:OrderByDirection = 'desc' ): Observable<any> {
    let d = _dataDaVisualizzare;
    let doff = this.addOneDay(_dataDaVisualizzare);
     
    const notesRef = collection(this.firestore, 'rilevamenti');

    const q = query(notesRef,where("Data", ">", d),where("Data", "<=", doff),orderBy("Data", _orderBy),limit(500));
  //  const querySnapshot =  getDocs(notesRef)
    
      
      return collectionData(q, { idField: 'id'}) as Observable<Rilevameto[]>;
  }

 
  getNoteById(id): Observable<Rilevameto> {
    const noteDocRef = doc(this.firestore, `rilevamenti/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Rilevameto>;
  }
 
  addNote(note:any) {
    const notesRef = collection(this.firestore, 'rilevamenti');
    //const userSubCollection = collection(this.firestore, `users/${user.uid}/sub-collection`);
 //   addCollection()
    note.rilevamento.forEach(element => {
      return addDoc(notesRef,element);
    });
 
    
  }
 
  deleteNote(note: Rilevameto) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }
 
 /* updateNote(note: Rilevameto) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, note);
  }*/

  getDatafromFile(){
   return this.http.get('assets/rilevamenti.txt').pipe(map(res=>{

    return this.createDataFromFile(res);
     
   }))
  }  

  addOneDay(data){
    var startDate = new Date(data);
  
  // seconds * minutes * hours * milliseconds = 1 day 
  var day = 60 * 60 * 24 * 1000;
  
  var endDate = new Date(startDate.getTime() + day);
  
  return  endDate;
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



}