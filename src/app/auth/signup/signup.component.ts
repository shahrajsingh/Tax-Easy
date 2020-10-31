import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { UserData } from "../userData.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  isLoading: boolean;
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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1500);
  }
  personaldetails(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
    }
    this.signupdata.Name = form.value.name;
    this.signupdata.CompanyName = form.value.cname;
    this.signupdata.Address = form.value.address;
    console.log("details taken");
  }
  preferences(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.signupdata.AlertQty = form.value.qtyalert;
      this.signupdata.IdSys = this.id;
      this.signupdata.Product_ID_Initial = form.value.mid;
    }
    console.log("preferences taken");
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
        alert("enter a valid email");
        return;
      }
      this.signupdata.Email = Email;
      let Password: string = form.value.password;
      if (!/^[a-zA-Z0-9]*$/.test(Password) || Password.length < 8) {
        alert("enter a valid password");
        return;
      }
      if (Password != form.value.cpassword) {
        alert("password mismatch!");
        return;
      }
      this.signupdata.Password = Password;
      console.log("sending form" + this.signupdata.Password);

      this.authService.signup(this.signupdata);
    }
  }
}
