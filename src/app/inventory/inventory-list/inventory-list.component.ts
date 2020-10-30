import { Component, Input, OnInit } from "@angular/core";

import { Inventory } from "../inventory.model";

@Component({
  selector: "app-inventory-list",
  templateUrl: "./inventory-list.component.html",
  styleUrls: ["./inventory-list.component.scss"],
})
export class InventoryListComponent implements OnInit {
  @Input() inventory: Inventory[] = [];

  constructor() {}

  ngOnInit(): void {}
}
