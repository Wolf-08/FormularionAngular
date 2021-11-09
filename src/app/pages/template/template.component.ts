import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais-service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent  {

  usuario = {
    nombre: 'Alejandro',
    apellido: 'Montecillo',
    correo: 'alejandro@gmail.com',
  }

  paises: any[] = [];
  constructor( ) { }

  // ngOnInit(): void {

  //   this.paisService.getPaises()
  //     .subscribe( paises => {
  //       this.paises = paises;

  //       this.paises.unshift({
  //         nombre: '[ Seleccione Pais]',
  //         codigo: ''
  //       })

  //       // console.log( this.paises );
  //     });

  // }

  guardar(forma: NgForm){

    if(forma.invalid){
      Object.values(forma.controls).forEach(control =>{
        control.markAllAsTouched();

      })
    }
    console.log(forma.value);
  }
}
