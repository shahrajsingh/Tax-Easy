import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { Inventory } from "./inventory.model";

const BACKEND_URL = environment.apiUrl + "/users";
@Injectable({
  providedIn: "root",
})
export class InventoryService {
  inventory: Inventory[] = [];
  InventoryUpdated = new Subject();
  InventoryListUpdated = new Subject<boolean>();
  InventoryListUpdatedListener() {
    return this.InventoryListUpdated.asObservable();
  }
  getLowStock() {
    const id = localStorage.getItem("userId");

    return this.http.get<{ message: string; result: Inventory[] }>(
      BACKEND_URL + "/getlowstock/" + id
    );
  }
  getOutofStock() {
    const id = localStorage.getItem("userId");

    return this.http.get<{ message: string; result: Inventory[] }>(
      BACKEND_URL + "/getoutofstock/" + id
    );
  }
  getInventory() {
    const id = localStorage.getItem("userId");
    this.http
      .get<{ message: string; result: Inventory[] }>(
        BACKEND_URL + "/getInventory/" + id
      )
      .subscribe(
        (res) => {
          this.inventory = res.result;
          this.InventoryUpdated.next([...this.inventory]);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  addToInventory(data: Inventory) {
    const userId = localStorage.getItem("userId");
    const userdata = {
      id: userId,
      ItemName: data.ItemName,
      Hsn: data.Hsn,
      Qty: data.Qty,
      Rate: data.Rate,
    };

    this.http
      .post<{ message: string; result: Inventory[] }>(
        BACKEND_URL + "/additem",
        userdata
      )
      .subscribe(
        (res) => {
          this.inventory = res.result;
          this.InventoryUpdated.next([...this.inventory]);
          this.InventoryListUpdated.next(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  InventoryUpdateListener() {
    return this.InventoryUpdated.asObservable();
  }

  constructor(private http: HttpClient) {}
}
