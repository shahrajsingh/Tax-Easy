import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Inventory } from "../inventory.model";
import { InventoryService } from "../inventory.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent implements OnInit {
  @Input() id;
  isloading: boolean = false;
  mode: string = "create";
  data: Inventory = {
    _id: null,
    ItemName: null,
    Qty: null,
    Rate: null,
    Hsn: null,
  };
  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id == null || this.id == undefined) {
      this.mode = "create";
    } else if (this.id) {
      this.mode = "edit";
      this.isloading = true;
      this.inventoryService.getInvenotryItem(this.id).subscribe((res) => {
        this.data = res.result;
        this.isloading = false;
      });
    }
  }
  additem() {
    if (this.mode === "edit") {
      const data: Inventory = {
        _id: this.id,
        ItemName: this.data.ItemName,
        Qty: this.data.Qty,
        Rate: this.data.Rate,
        Hsn: this.data.Hsn,
      };
      this.inventoryService.updateInventoryData(data);
    } else {
      const data: Inventory = {
        _id: null,
        ItemName: this.data.ItemName,
        Qty: this.data.Qty,
        Rate: this.data.Rate,
        Hsn: this.data.Hsn,
      };
      this.inventoryService.addToInventory(data);
    }
  }
  delete(id: string) {
    this.inventoryService.deleteitem(id);
  }
}
