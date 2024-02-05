import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RoleComponent } from '../../pages/auth/role/role.component';
export interface MyCellParams {
  buttonText?: string;
}

@Component({
  selector: 'app-my-cell',
  template: `
    <i (click)="onEdit($event)" class='mdi mdi-pencil' style="font-size: 22px;"></i> |
    <i (click)="onDelete($event)" class='mdi mdi-delete-forever' style="color: red; font-size: 22px;">
  `,
  styles: [
  ]
})
export class MyCellComponentComponent implements OnInit, ICellRendererAngularComp {

  value: any;
  buttonText: string = 'Default';

  agInit(params: ICellRendererParams & MyCellParams): void {
   this.value = params.value
   this.buttonText = params.buttonText ?? 'Default';
  }

  refresh(params: ICellRendererParams & MyCellParams): boolean {
    return false;
  }

  onEdit(event: any){
    debugger;
    alert('Cell value is ' + this.value);
  }
  
  onDelete(event: any){
    alert('Cell value is ' + this.value);
  }

  ngOnInit(): void {
  }

}
