import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Bill } from "../bill.model";
import { BillService } from "../bill.service";

@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.scss"],
})
export class BillComponent implements OnInit {
  total: Number;
  items: Bill[] = [];
  billupdatesub: Subscription;
  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billupdatesub = this.billService
      .billupdated()
      .subscribe((res: Bill[]) => {
        this.items = res;
        console.log(this.items);
      });
  }
}
