import { Component, Input, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

import { Inventory } from "../inventory.model";
import { InventoryService } from "../inventory.service";

@Component({
  selector: "app-inventory-list",
  templateUrl: "./inventory-list.component.html",
  styleUrls: ["./inventory-list.component.scss"],
})
export class InventoryListComponent implements OnInit {
  @Input() inventory: Inventory[] = [];
  Inventory: Inventory[] = [];
  isLoading: boolean = false;
  totalItems = 0;
  itemsPerPage = 5;
  currentPage = 0;
  lastIndex = 5;
  pageSizeOptions = [5, 10, 30, 50];
  onChangedPage(pageData: PageEvent) {
    this.Inventory = [];
    this.itemsPerPage = pageData.pageSize;
    let j = 0;
    for (
      let i = pageData.pageIndex * pageData.pageSize;
      i < this.inventory.length;
      i++
    ) {
      if (j >= pageData.pageSize) {
        break;
      } else {
        this.Inventory[j] = this.inventory[i];
        j++;
      }
    }
  }
  updateInventory() {
    console.log(this.inventory);
    this.totalItems = this.inventory.length;
    if (this.Inventory.length >= this.itemsPerPage) {
      return;
    } else {
      console.log("inventory else");
      for (let i = 0; i < this.inventory.length; i++) {
        if (i >= this.itemsPerPage) {
          break;
        } else {
          console.log("inventory else");
          this.Inventory[i] = this.inventory[i];
        }
      }
    }
  }
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.updateInventory();
    this.inventoryService
      .InventoryListUpdatedListener()
      .subscribe((res: boolean) => {
        if (res) {
          console.log("inventory updated");
          this.updateInventory();
          console.log(this.Inventory);
        }
      });
  }
}
