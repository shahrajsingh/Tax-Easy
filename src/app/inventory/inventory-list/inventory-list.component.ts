import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Inventory } from "../inventory.model";
import { InventoryService } from "../inventory.service";

@Component({
  selector: "app-inventory-list",
  templateUrl: "./inventory-list.component.html",
  styleUrls: ["./inventory-list.component.scss"],
})
export class InventoryListComponent implements OnInit {
  inventory: Inventory[] = [
    { _id: "1", ItemName: "First Name", Qty: 4, TaxPercent: 5, Rate: 124 },
    { _id: "2", ItemName: "First Name", Qty: 4, TaxPercent: 5, Rate: 124 },
    { _id: "3", ItemName: "First Name", Qty: 4, TaxPercent: 5, Rate: 124 },
    { _id: "4", ItemName: "First Name", Qty: 4, TaxPercent: 5, Rate: 124 },
    { _id: "5", ItemName: "First Name", Qty: 4, TaxPercent: 5, Rate: 124 },
  ];
  inventoryUpdatedSud: Subscription;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryUpdatedSud = this.inventoryService
      .InventoryUpdateListener()
      .subscribe((res: Inventory[]) => {
        this.inventory = res;
      });
  }
}
