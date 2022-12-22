import { Component,ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GoogleMap, MapInfoWindow, MapMarker  } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Buses {
  vid: Number;
  timestamp: String;
  lat: String;
  lon: String;
  hdg: String;
  pid: String;
  rt: String;
  des: String;
  pdist: String;
  dly: String;
  tatripid: String;
  origtatripno: String;
  tablockid: String;
  zone: String;
}




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public now: Date = new Date();

  

 


  ////////////////////////////////////////////////
  title = 'Bus-Route';
  private data: any = [];
  private data2: any = [];
  Buses: Buses[] = [];
  OV_Buses: Buses[] = [];
  markers = [
    {
      position:{

      
        lat: 21.1594627,
        lng: 72.6822083,
      },
        label: 'Surat',
    
    
      

      options: {
        //animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/kml/shapes/bus.png'
      }

    },
];

  constructor(private http: HttpClient) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
   }




  apiLoaded = this.http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2r8xNcsF9z9x5pfh3CIwjLSGJYUhctdM', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );













  onUpdate() {


    //console.log(RouteID,Speed);
  
    //Making DB get Updated Data from BusTracker API for specific Route
    var RouteID = ((document.getElementById("RouteID") as HTMLInputElement).value);
    var Speed = ((document.getElementById("SpeedID") as HTMLInputElement).value);
    let params = new HttpParams();
    params = params.append('vehicle', RouteID);
    this.http.get('http://localhost:3000/api/UpdateData', { params: params }).subscribe(() => {




    });
   
  }

  onStart() {

    

    while(this.markers.length){
      this.markers.pop();
    }    
    

    //Fetching Data from DB
    const url = 'http://localhost:3000/api/getAll'
    this.http.get(url).subscribe((res) => {
      this.data = res
      //console.log(this.data)
      this.Buses = this.data


      for (var Bus of this.Buses) {
       
        this.markers.push({
          position:{
            lat:Number(Bus.lat),
            lng:Number(Bus.lon)
          },
          label:String(Bus.vid),
          options: {
            //animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/kml/shapes/bus.png'
          }
        })
      }
    })






  }

 
  onReport() {

    var RouteID = ((document.getElementById("RouteID") as HTMLInputElement).value);
    var Speed = ((document.getElementById("SpeedID") as HTMLInputElement).value);


    let params = new HttpParams();
    params = params.append('vehicle', RouteID);
    params = params.append('speed', Speed);
    this.http.get('http://localhost:3000/api/SpeedCheck', { params: params }).subscribe((res) => {


    this.data2=res

    this.OV_Buses=this.data2

    });

  }


  showInfo(label:String){
    
    alert(this.now.toTimeString() +"  \nBus ID:  "+ label);

  }

  
}


