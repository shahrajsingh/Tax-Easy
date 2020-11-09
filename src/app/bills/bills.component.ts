import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BillService } from "../home/bill.service";

import { Bills } from "./bills.model";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  isLoading: boolean;
  bills: Bills[] = [];
  constructor(private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.billService.getBills().subscribe((res) => {
      this.bills = res.result;
      this.isLoading = false;
    });
  }
  viewBill(id) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(["/viewBill", id])
    );

    window.open(url, "_blank");
  }
}
