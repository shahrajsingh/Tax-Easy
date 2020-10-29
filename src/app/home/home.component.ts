import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isMakingBill: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  isMaking() {
    this.isMakingBill = true;
  }
  notMaking() {
    this.isMakingBill = false;
  }
}
