import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Bills } from "./bills.model";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  bills: Bills[] = [
    {
      _id: "1234",
      issuedTo: "mefasdfsdafisdfhsdufhsdhfkjsdhfihsdjfhjdfgjdsakjfgjsdgfj",
      Date: "12344",
    },
    {
      _id: "1234",
      issuedTo: "me",
      Date: "12344",
    },
    {
      _id: "1234",
      issuedTo: "me",
      Date: "12344",
    },
    {
      _id: "1234",
      issuedTo: "me",
      Date: "12344",
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  viewBill(id: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(["/viewBill", id])
    );

    window.open(url, "_blank");
  }
}
