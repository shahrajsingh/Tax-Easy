import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SnackbarService } from "src/app/snackbar.service";

import { AuthService } from "../auth.service";
import { UserData } from "../userData.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  isLoading: boolean;
  isLoadingIn: boolean = false;
  id = "auto";
  signupdata: UserData = {
    Name: null,
    CompanyName: null,
    Address: null,
    Email: null,
    Password: null,
    IdSys: null,
    Product_ID_Initial: null,
    AlertQty: null,
  };
  constructor(
    private authService: AuthService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1200);
  }
  personaldetails(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
    }
    this.signupdata.Name = form.value.name;
    this.signupdata.CompanyName = form.value.cname;
    this.signupdata.Address = form.value.address;
  }
  preferences(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.signupdata.AlertQty = form.value.qtyalert;
      this.signupdata.IdSys = this.id;
      this.signupdata.Product_ID_Initial = form.value.mid;
    }
  }
  accountdetails(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      let Email: string = form.value.email;
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          Email
        )
      ) {
        this.snackBar.openSnackbar("Invalid Email Address!");
        return;
      }
      this.signupdata.Email = Email;
      let Password: string = form.value.password;
      if (!/^[a-zA-Z0-9]*$/.test(Password) || Password.length < 8) {
        this.snackBar.openSnackbar("Enter a valid Password!");
        return;
      }
      if (Password != form.value.cpassword) {
        this.snackBar.openSnackbar("Password MisMatch");
        return;
      }
      this.signupdata.Password = Password;
      this.isLoadingIn = true;
      this.authService.signup(this.signupdata);
    }
  }
}
