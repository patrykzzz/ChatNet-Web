import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule, MatCardModule, MatListModule, MatDialogModule } from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
