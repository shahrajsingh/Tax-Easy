import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isAuth: boolean = true;
  CompanyName: string;
  private authListenerSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.isAuth = this.authService.getIsAuth();
    this.CompanyName = this.authService.getCompanyName();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((res: boolean) => {
        this.isAuth = res;
      });
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
