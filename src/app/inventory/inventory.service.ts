import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Inventory } from "./inventory.model";

const BACKEND_URL = environment.apiUrl + "/users";
@Injectable({
  providedIn: "root",
})
export class InventoryService {
  inventory: Inventory[] = [];
  InventoryUpdated = new Subject();
  getLowStock() {}
  getOutofStock() {}
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
      .post<{ message: string; result: any }>(
        BACKEND_URL + "/additem",
        userdata
      )
      .subscribe(
        (res) => {
          console.log(res.result);
          this.inventory.push(data);
          this.InventoryUpdated.next([...this.inventory]);
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
