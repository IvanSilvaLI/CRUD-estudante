import { EstudanteService } from './../estudante.service';
import { Component, OnInit } from '@angular/core';
import { estudante } from '../estudante';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit{

  estudante: estudante[] = [];
  isEditing : boolean = false;
  formGroupEstudante : FormGroup;

  constructor(private EstudanteService: EstudanteService,
              private formBuilder: FormBuilder
    ){
      this.formGroupEstudante = formBuilder.group({
        id : [''],
        nome : [''],
        idade: [''],
        data_nascimento: [''],
        cpf: ['']
      })


              }

  ngOnInit(): void {
    this.loadEstudantes();

  }
  loadEstudantes() {
    this.EstudanteService.getEstudante().subscribe(
      {
        next : data => this.estudante = data


      }
    );

  }
  save(){
    if(this.isEditing){
        this.EstudanteService.update(this.formGroupEstudante.value).subscribe(
          {
            next: () => {
              this.loadEstudantes();
              this.formGroupEstudante.reset();
              this.isEditing = false;
            }
          }
        )
    }
    else{

    this.EstudanteService.save(this.formGroupEstudante.value).subscribe(
      {
        next: data => {
        this.estudante.push(data);
        this.formGroupEstudante.reset();
        }
      }
    );
  }
  }

  edit(estudante : estudante){
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }

  clean(){
    this.formGroupEstudante.reset();
    this.isEditing = false;
  }


  delete(estudante : estudante){
    this.EstudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes()
    });
  }

}
