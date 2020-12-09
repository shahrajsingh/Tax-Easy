import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { SnackbarService } from "src/app/snackbar.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: Boolean;
  isLoasingIn: Boolean = false;
  private AuthsStatusListnerSub: Subscription;
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.AuthsStatusListnerSub = this.authService
      .getAuthStatusListener()
      .subscribe((result) => {
        console.log("data");

        this.isLoasingIn = false;
      });
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
  ngOnDestroy() {
    this.AuthsStatusListnerSub.unsubscribe();
  }
}
