import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  seeLowStock: boolean = false;
  seeOutofStock: boolean = false;
  addItem: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  sLS() {
    this.seeOutofStock = false;
    this.addItem = false;
    this.seeLowStock = !this.seeLowStock;
  }
  sOS() {
    this.addItem = false;
    this.seeLowStock = false;
    this.seeOutofStock = !this.seeOutofStock;
  }
  additem() {
    this.seeLowStock = false;
    this.seeOutofStock = false;
    this.addItem = !this.addItem;
  }
}
