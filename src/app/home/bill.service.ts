import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Bills } from "../bills/bills.model";
import { Inventory } from "../inventory/inventory.model";
import { SnackbarService } from "../snackbar.service";
import { Bill } from "./bill.model";
const BackendUrl = environment.apiUrl + "/bill";
@Injectable({
  providedIn: "root",
})
export class BillService {
  getBill(billId: any) {
    const id = localStorage.getItem("userId");
    const queryParams = `?userid=${localStorage.getItem(
      "userId"
    )}&billid=${billId}`;
    return this.http.get<{
      message: string;
      result: any;
      CompanyName: string;
      Address: string;
    }>(BackendUrl + queryParams);
  }

  getBills() {
    return this.http.get<{ message: string; result: Bills[] }>(
      BackendUrl + "/bills/" + localStorage.getItem("userId")
    );
  }

  getProductNames() {
    return this.http.get<{ message: string; result: string[] }>(
      BackendUrl + "/getitemnames/" + localStorage.getItem("userId")
    );
  }
  /*
  geInvoiceId() {
    this.http.get<{}>(BackendUrl + "/getinvoiceId");
  }*/

  IssueInvoice() {
    const issueDate =
      this.d.getDate() +
      "/" +
      (this.d.getMonth() + 1) +
      "/" +
      this.d.getFullYear() +
      " " +
      this.d.getHours() +
      ":" +
      this.d.getMinutes() +
      ":" +
      this.d.getSeconds() +
      ":" +
      this.d.getSeconds();
    const bill = {
      IssuedTo: this.IssuedTo,
      IssueDate: issueDate,
      Items: this.Items,
      Total: this.Total,
      IssuedBy: localStorage.getItem("userId"),
    };
    this.http
      .post<{ message: string; result }>(BackendUrl + "/issueinvoice", bill)
      .subscribe(
        (res) => {
          this.snackbar.openSnackbar(res.message);
          this.cancelBill();
          window.location.reload();
        },
        (error) => {
          this.snackbar.openSnackbar(error.error.message);
        }
      );
  }

  billupdated() {
    return this.billUpdateListener.asObservable();
  }

  getDetails(id: string, qty: number, issuedto: string) {
    if (qty < 1) {
      this.snackbar.openSnackbar("Quantity cannot be less than 1");
      return;
    }
    const queryParams = `?userid=${localStorage.getItem(
      "userId"
    )}&itemid=${id}`;
    const backendUrl = environment.apiUrl + "/inventory";
    this.http
      .get<{ message: string; result: Inventory }>(backendUrl + queryParams)
      .subscribe(
        (res) => {
          for (let i = 0; i < this.Items.length; i++) {
            if (this.Items[i]._id === id) {
              if (this.Items[i].Qty + qty > res.result.Qty) {
                this.snackbar.openSnackbar(
                  "Quantity excedding than available!"
                );
                return;
              } else {
                this.Items[i].Qty += qty;
                this.Items[i].Tax = parseFloat(
                  (
                    (this.Items[i].TaxPercent / 100) *
                    this.Items[i].Rate *
                    this.Items[i].Qty
                  ).toFixed(2)
                );
                this.Total -= parseFloat(this.Items[i].Amt.toFixed(2));
                this.Items[i].Amt = parseFloat(
                  (
                    this.Items[i].Rate * this.Items[i].Qty +
                    this.Items[i].Tax
                  ).toFixed(2)
                );
                this.Total += parseFloat(this.Items[i].Amt.toFixed(2));
                this.billUpdateListener.next({
                  bill: [...this.Items],
                  Total: this.Total,
                });
                return;
              }
            }
          }
          if (res.result.Qty < qty) {
            this.snackbar.openSnackbar("Entered Quantity is not available");
            return;
          } else {
            const taxpercent: number = res.result.TaxPercent;
            const rate: number = res.result.Rate;
            const tax: number = parseFloat(
              ((taxpercent / 100) * rate * qty).toFixed(2)
            );
            const amt: number = parseFloat((rate * qty + tax).toFixed(2));
            this.Total += amt;
            this.Total = parseFloat(this.Total.toFixed(2));
            this.IssuedTo = issuedto;
            const data: Bill = {
              _id: res.result._id,
              ItemName: res.result.ItemName,
              Qty: qty,
              Rate: rate,
              TaxPercent: taxpercent,
              Tax: tax,
              Amt: amt,
            };
            this.Items.push(data);
            this.billUpdateListener.next({
              bill: [...this.Items],
              Total: this.Total,
            });
          }
        },
        (error) => {
          this.snackbar.openSnackbar(error.error.message);
          console.log(error, error.result);
        }
      );
  }

  delete(x: number) {
    this.Total = this.Total - this.Items[x].Amt;
    this.Total = parseFloat(this.Total.toFixed(2));
    this.Items.splice(x, 1);
    this.billUpdateListener.next({ bill: [...this.Items], Total: this.Total });
  }

  cancelBill() {
    this.Items = [];
    this.Total = undefined;
    this.billUpdateListener.next({ bill: [...this.Items], Total: this.Total });
  }

  getItems() {
    return [...this.Items];
  }

  InvoiceId: string;
  IssuedTo: string;
  d = new Date();
  Items: Bill[] = [];
  Total: number = 0;
  billUpdateListener = new Subject<{ bill: Bill[]; Total: number }>();
  constructor(private http: HttpClient, private snackbar: SnackbarService) {}
}
