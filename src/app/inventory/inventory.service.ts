import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { SnackbarService } from "../snackbar.service";

import { Inventory } from "./inventory.model";

const BACKEND_URL = environment.apiUrl + "/inventory";
@Injectable({
  providedIn: "root",
})
export class InventoryService {
  deleteitem(id: string) {
    const data = { userId: localStorage.getItem("userId"), itemid: id };

    this.http
      .put<{ message: string; result: Inventory[] }>(
        BACKEND_URL + "/deleteitem",
        data
      )
      .subscribe(
        (res) => {
          if (res.message === "item deleted") {
            this.inventory = res.result;
            this.InventoryUpdated.next([...this.inventory]);
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => {
                this.router.navigate(["/inventory"]);
              });
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  InventoryUpdateRequestListener() {
    return this.InventoryUpdateRequest.asObservable();
  }
  updateInventory(id) {
    this.InventoryUpdateRequest.next({ bool: true, id: id });
  }

  updateInventoryData(data) {
    //const id = localStorage.getItem("userId");
    this.http
      .put<{ message: string; result }>(BACKEND_URL + "/updateitem", data)
      .subscribe((res) => {
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => {
            this.router.navigate(["/inventory"]);
          });
      });
  }
  //change data in html
  getInvenotryItem(id: string) {
    return this.http.get<{ message: string; result: Inventory }>(
      BACKEND_URL + "/getinventoryitem/" + id
    );
  }

  getOutofStock() {
    const id = localStorage.getItem("userId");

    return this.http.get<{ message: string; result: Inventory[] }>(
      BACKEND_URL + "/getoutofstock/" + id
    );
  }

  getLowStock() {
    const id = localStorage.getItem("userId");

    return this.http.get<{ message: string; result: Inventory[] }>(
      BACKEND_URL + "/getlowstock/" + id
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
          this.SnackBar.openSnackbar(error.message);
        }
      );
  }

  addToInventory(data) {
    const userId = localStorage.getItem("userId");
    const userdata = {
      SellerId: userId,
      ItemName: data.ItemName,
      TaxPercent: data.TaxPercent,
      Hsn: data.Hsn,
      Qty: data.Qty,
      Rate: data.Rate,
    };

    this.http
      .post<{ message: string; result: Inventory }>(
        BACKEND_URL + "/additem",
        userdata
      )
      .subscribe(
        (res) => {
          console.log(this.inventory);
          this.inventory.push(res.result);
          this.InventoryUpdated.next([...this.inventory]);

          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.router.navigate(["/inventory"]);
            });
        },
        (error) => {
          this.SnackBar.openSnackbar(error.message);
        }
      );
  }
  InventoryUpdateListener() {
    return this.InventoryUpdated.asObservable();
  }
  inventory: Inventory[] = [];
  InventoryUpdated = new Subject();
  InventoryUpdateRequest = new Subject<{ bool: boolean; id: string }>();
  constructor(
    private http: HttpClient,
    private SnackBar: SnackbarService,
    private router: Router
  ) {}
}
