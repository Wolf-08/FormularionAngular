import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient) { }


  getPaises() {

    return this.http.get('https://restcountries.com/rest/v2/lang/es')
      .pipe( 
        map( (resp:any) => 
            resp.map( (pais: { name: any; alpha3Code: any; }) => ({ nombre: pais.name, codigo: pais.alpha3Code })
          )
        )
       );

  }

}