import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Bills } from "../bills/bills.model";
import { Inventory } from "../inventory/inventory.model";
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
    return this.http.get<{}>(BackendUrl + "/getbill" + queryParams);
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

  geInvoiceId() {
    this.http.get<{}>(BackendUrl + "/getinvoiceId");
  }

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
      Id: this.InvoiceId,
      IssuedTo: this.IssuedTo,
      IssueDate: issueDate,
      Items: this.Items,
      Total: this.Total,
    };
    this.http
      .post<{ message: string; result }>(
        BackendUrl + "/issueinvoice/" + localStorage.getItem("userId"),
        bill
      )
      .subscribe((res) => {
        alert("bill made");
        window.location.reload();
      });
  }

  billupdated() {
    return this.billUpdateListener.asObservable();
  }

  getDetails(id: string, qty: number, issuedto: string) {
    const queryParams = `?userid=${localStorage.getItem(
      "userId"
    )}&itemname=${id}`;
    this.http
      .get<{ message: string; result: Inventory }>(BackendUrl + queryParams)
      .subscribe((res) => {
        const taxpercent: number = parseFloat(res.result.Hsn.toFixed(2));
        const rate: number = parseFloat(res.result.Rate.toFixed(2));
        const tax: number = parseFloat(
          ((taxpercent / 100) * rate * qty).toFixed(2)
        );
        const amt: number = parseFloat((rate * qty + tax).toFixed(2));
        this.Total += amt;
        this.Total = parseFloat(this.Total.toFixed(2));
        this.IssuedTo = issuedto;
        const data: Bill = {
          ItemName: id,
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
      });
  }

  delete(x: number) {
    this.Total = this.Total - this.Items[x].Amt;
    this.Total = parseFloat(this.Total.toFixed(2));
    this.Items.splice(x, 1);
    this.billUpdateListener.next({ bill: [...this.Items], Total: this.Total });
  }

  InvoiceId: string;
  IssuedTo: string;
  d = new Date();
  Items: Bill[] = [];
  Total: number = 0;
  billUpdateListener = new Subject<{ bill: Bill[]; Total: number }>();
  constructor(private http: HttpClient) {}
}
