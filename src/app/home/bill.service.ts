import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Bill } from "./bill.model";
const BackendUrl = environment.apiUrl + "/users";
@Injectable({
  providedIn: "root",
})
export class BillService {
  InvoiceId: string;
  IssuedTo: string;
  d = new Date();
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
      .subscribe((res) => {});
  }
  Items: Bill[] = [];
  Total: number = 0;
  billUpdateListener = new Subject<{ bill: Bill[]; Total: number }>();
  constructor(private http: HttpClient) {}
  billupdated() {
    return this.billUpdateListener.asObservable();
  }
  getDetails(id: string, qty: number, issuedto: string) {
    const taxpercent: number = parseFloat((5).toFixed(2));
    const rate: number = parseFloat((123).toFixed(2));
    const tax: number = parseFloat(((5 / 100) * rate * qty).toFixed(2));
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
    this.billUpdateListener.next({ bill: [...this.Items], Total: this.Total });
  }
  delete(x: number) {
    this.Total = this.Total - this.Items[x].Amt;
    this.Total = parseFloat(this.Total.toFixed(2));
    this.Items.splice(x, 1);
    this.billUpdateListener.next({ bill: [...this.Items], Total: this.Total });
  }
}
