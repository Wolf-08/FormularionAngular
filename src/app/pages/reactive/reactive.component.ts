import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup; 

  constructor( private fb: FormBuilder) { 
  this.crearFormulario();
  this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }
  
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  campoValido(campo:string) {
    return this.forma.get(campo)?.invalid && this.forma.get(campo)?.touched
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario(){

    //Validadores sincronos
    this.forma = this.fb.group({

      nombre  : ['',[Validators.required,Validators.minLength(5)], ],
      apellido: ['',[Validators.required,Validators.minLength(5)], ],
      correo  : ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),]],
      direccion : this.fb.group({
        distrito: ['',Validators.required],
        ciudad: ['',Validators.required]
      }),
      pasatiempos: this.fb.array([]),
    })

  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Alejandro',
      apellido: 'Sanchez',
      correo: 'fernando@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Benito Juarez',
        ciudad: 'Mexico'
      },
    });

  }
  agregarPasatiempo() {
    this.pasatiempos.push(  this.fb.control('')  );
  }
  
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }


  guardar() {
    console.log( this.forma );


    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }
    this.forma.reset({
      nombre: 'Sin nombre'
    });
  }
}
