import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Bill } from "../bill.model";
import { BillService } from "../bill.service";

@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.scss"],
})
export class BillComponent implements OnInit, OnDestroy {
  d = new Date();
  CompanyName: string;
  Address: string;
  InvoiceNumber: string;
  Date =
    this.d.getDate() +
    "/" +
    (this.d.getMonth() + 1) +
    "/" +
    this.d.getFullYear() +
    " " +
    this.d.getHours() +
    ":" +
    this.d.getMinutes() +
    ":" +
    this.d.getSeconds() +
    ":" +
    this.d.getSeconds();
  Total: number;
  Items: Bill[] = [];
  billupdatesub: Subscription;
  constructor(
    private billService: BillService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.Items = this.billService.getItems();
    this.authService.getUserData().subscribe((res) => {
      (this.Address = res.result.address),
        (this.CompanyName = res.result.companyName);
    });
    this.billupdatesub = this.billService.billupdated().subscribe((res) => {
      this.Items = res.bill;
      this.Total = res.Total;
    });
  }
  delete(x) {
    this.billService.delete(x);
  }
  ngOnDestroy() {
    this.billupdatesub.unsubscribe();
  }
}
