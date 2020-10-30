import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Inventory } from "./inventory.model";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  inventory: Inventory[] = [];
  InventoryUpdated = new Subject();
  addToInventory(data: Inventory) {
    this.inventory.push(data);
    this.InventoryUpdated.next([...this.inventory]);
  }
  InventoryUpdateListener() {
    return this.InventoryUpdated.asObservable();
  }

  constructor() {}
}
