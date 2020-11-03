import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { Inventory } from "./inventory.model";
import { InventoryService } from "./inventory.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  isloading: boolean = true;
  seeLowStock: boolean = false;
  seeOutofStock: boolean = false;
  addItem: boolean = false;
  lowStockCout: number;
  outOfStockCount: number;
  inventory: Inventory[] = [];
  lowStock: Inventory[] = [];
  outOfStock: Inventory[] = [];
  inventoryUpdatedSud: Subscription;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryUpdatedSud = this.inventoryService
      .InventoryUpdateListener()
      .subscribe((res: Inventory[]) => {
        this.isloading = true;

        this.inventory = res;
        this.isloading = false;
      });
    this.inventoryService.getInventory();
    this.inventoryService.getLowStock().subscribe((res) => {
      this.lowStock = res.result;
      this.lowStockCout = this.lowStock.length;
    });
    this.inventoryService.getOutofStock().subscribe((res) => {
      this.outOfStock = res.result;
      this.outOfStockCount = this.outOfStock.length;
      this.isloading = false;
    });
  }
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
