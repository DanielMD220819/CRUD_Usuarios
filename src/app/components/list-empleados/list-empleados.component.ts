import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((elemento: any) => {
        /*console.log(elemento.payload.doc.id);*/
        /*console.log(elemento.payload.doc.data());*/
        this.empleados.push({
          id: elemento.payload.doc.id,
          ...elemento.payload.doc.data()
        });
      });
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      this.toastr.error('Registro eliminado con exito!!!', 'Registro eliminado...', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.error(error);
    });
  }
}
