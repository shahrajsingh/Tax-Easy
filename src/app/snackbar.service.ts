import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}
  openSnackbar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
