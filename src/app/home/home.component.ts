import { Component, OnInit } from "@angular/core";
import { BillService } from "./bill.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isMakingBill: boolean = false;
  constructor(private billService: BillService) {}

  ngOnInit(): void {}
  isMaking() {
    this.isMakingBill = true;
  }
  notMaking() {
    this.isMakingBill = false;
    this.billService.cancelBill();
  }
}
