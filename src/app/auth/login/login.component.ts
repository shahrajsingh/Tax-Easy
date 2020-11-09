import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SnackbarService } from "src/app/snackbar.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isLoading: Boolean;
  isLoasingIn: Boolean = false;
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1500);
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (form.value.email.match(mailformat)) {
        this.isLoasingIn = true;
        this.authService.login(form.value.email, form.value.password);
      } else {
        this.snackbar.openSnackbar("Invalid Email Address!");
        form.reset();
        return;
      }
    }
  }
}
