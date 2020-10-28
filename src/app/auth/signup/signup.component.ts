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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1500);
  }
  signup(form: NgForm) {
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
      let Password: string = form.value.password;
      if (!/^[a-zA-Z0-9]*$/.test(Password) || Password.length < 8) {
        alert("enter a valid password");
        return;
      }
      if (Password != form.value.cpassword) {
        alert("password mismatch!");
        return;
      }
      const signupdata: UserData = {
        Name: form.value.name,
        Email: Email,
        CompanyName: form.value.cname,
        Password: Password,
      };
      this.authService.signup(signupdata);
    }
  }
}
