import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule } from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
