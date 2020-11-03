import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { Inventory } from "./inventory.model";
import { InventoryService } from "./inventory.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit, OnDestroy {
  isloading: boolean = true;
  seeLowStock: boolean = false;
  seeOutofStock: boolean = false;
  addItem: boolean = false;
  lowStockCout: number;
  updateId: string;
  outOfStockCount: number;
  inventory: Inventory[] = [];
  lowStock: Inventory[] = [];
  outOfStock: Inventory[] = [];
  inventoryUpdatedSub: Subscription;
  inventoryUpdateRequestSub: Subscription;
  constructor(
    private inventoryService: InventoryService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.inventoryUpdatedSub = this.inventoryService
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
    this.inventoryUpdateRequestSub = this.inventoryService
      .InventoryUpdateRequestListener()
      .subscribe((res: { bool: boolean; id: string }) => {
        if (res.bool) {
          this.addItem = false;
          this.ref.detectChanges();
          this.updateId = res.id;
          console.log(res);
          this.updateitem();
        }
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
    this.updateId = null;
    this.seeLowStock = false;
    this.seeOutofStock = false;
    this.addItem = !this.addItem;
  }
  updateitem() {
    this.seeLowStock = false;
    this.seeOutofStock = false;
    this.addItem = !this.addItem;
  }
  ngOnDestroy() {
    this.inventoryUpdateRequestSub.unsubscribe();
    this.inventoryUpdatedSub.unsubscribe();
  }
}
