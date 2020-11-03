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
  itemsPerPage = 10;
  currentPage = 0;

  pageSizeOptions = [10, 20, 30, 50];
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
    this.totalItems = this.inventory.length;
    if (this.Inventory.length >= this.itemsPerPage) {
      return;
    } else {
      for (let i = 0; i < this.inventory.length; i++) {
        if (i >= this.itemsPerPage) {
          break;
        } else {
          this.Inventory[i] = this.inventory[i];
        }
      }
    }
  }
  constructor() {}

  ngOnInit(): void {
    this.updateInventory();
  }
}
