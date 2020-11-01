import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Inventory } from "../inventory.model";
import { InventoryService } from "../inventory.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent implements OnInit {
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {}
  additem(form: NgForm) {
    const data: Inventory = {
      _id: null,
      ItemName: form.value.itemName,
      Qty: form.value.qty,
      Rate: form.value.rate,
      Hsn: form.value.hsn,
    };
    this.inventoryService.addToInventory(data);
  }
}
