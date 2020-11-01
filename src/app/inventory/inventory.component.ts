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
        this.inventory = res;
      });
    this.inventoryService.getInventory();
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
