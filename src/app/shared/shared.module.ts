import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCompModule } from './mat-comp/mat-comp.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCompModule
  ],
  exports:[
    MatCompModule
  ]
})
export class SharedModule { }
