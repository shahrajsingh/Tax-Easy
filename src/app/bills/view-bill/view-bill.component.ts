import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { AuthService } from "src/app/auth/auth.service";
import { Bill } from "src/app/home/bill.model";
const BackendUrl = "http://localhost:3000/api";
@Component({
  selector: "app-view-bill",
  templateUrl: "./view-bill.component.html",
  styleUrls: ["./view-bill.component.scss"],
})
export class ViewBillComponent implements OnInit {
  data = { userId: null, billid: null };
  bill: Bill[] = [
    {
      ItemName: "adsf",
      Qty: 3,
      Tax: 123,
      TaxPercent: 5,
      Rate: 12312,
      Amt: 121,
    },
  ];
  d = new Date();
  CompanyName: string;
  Date: string;
  Address: string;
  total: number;
  InvoiceNumber: string;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.data.userId = this.authService.getUserId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.data.userId = paramMap.get("id");
        this.http.get<{}>(BackendUrl + this.data).subscribe((res) => {});
      }
    });
  }
}
