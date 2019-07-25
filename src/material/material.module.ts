import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule, MatCardModule, MatListModule } from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule { }
