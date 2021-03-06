import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./authData.model";
import { environment } from "../../environments/environment";
import { UserData } from "./userData.model";
import { HttpClient } from "@angular/common/http";
import { SnackbarService } from "../snackbar.service";

const BACKEND_URL = environment.apiUrl + "/users";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private Ls: number;
  companyName: string;
  private authStatusListener = new Subject<boolean>();
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) {}
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  signup(userData: UserData) {
    this.http
      .post<{ Message: string; Result: any }>(BACKEND_URL + "/signup", userData)
      .subscribe(
        (res) => {
          this.snackBarService.openSnackbar("SignUp Success");
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.log(error.error);
          this.snackBarService.openSnackbar("Signup Failed!");
          this.authStatusListener.next(false);
        }
      );
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        Ls: number;
        CompanyName: string;
      }>(BACKEND_URL + "/login", authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.snackBarService.openSnackbar("Login Success");
            const expiresInDuration = response.expiresIn;
            this.companyName = response.CompanyName;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            (this.Ls = response.Ls), this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.Ls,
              this.companyName
            );
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.snackBarService.openSnackbar("Invalid Login Details!");
          this.authStatusListener.next(false);
        }
      );
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.Ls = authInformation.Ls;
      this.companyName = authInformation.CompanyName;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    Ls: number,
    CompanyName: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("Ls", Ls.toString());
    localStorage.setItem("cName", this.companyName);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("Ls");
    localStorage.removeItem("cName");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const Ls = parseInt(localStorage.getItem("Ls"));
    const CompanyName = localStorage.getItem("cName");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      Ls: Ls,
      CompanyName: CompanyName,
    };
  }
  getUserData() {
    const id = this.getUserId();

    return this.http.get<{ message: string; result: any }>(
      BACKEND_URL + "/" + id
    );
  }
  getCompanyName() {
    return this.companyName;
  }
}
