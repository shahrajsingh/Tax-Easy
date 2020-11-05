import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Bill } from "./bill.model";

@Injectable({
  providedIn: "root",
})
export class BillService {
  items: Bill[] = [];
  total: number = 0;
  billUpdateListener = new Subject<{ bill: Bill[]; Total: number }>();
  constructor() {}
  billupdated() {
    return this.billUpdateListener.asObservable();
  }
  getDetails(id: string, qty: number, issuedto: string) {
    const taxpercent: number = parseFloat((5).toFixed(2));
    const rate: number = parseFloat((123).toFixed(2));
    const tax: number = parseFloat(((5 / 100) * rate * qty).toFixed(2));
    const amt: number = parseFloat((rate * qty + tax).toFixed(2));
    this.total += amt;
    this.total = parseFloat(this.total.toFixed(2));
    const data: Bill = {
      ItemName: id,
      Qty: qty,
      Rate: rate,
      Taxpercent: taxpercent + "%",
      Tax: tax,
      Amt: amt,
    };
    this.items.push(data);
    this.billUpdateListener.next({ bill: [...this.items], Total: this.total });
  }
  delete(x: number) {
    this.total = this.total - this.items[x].Amt;
    this.total = parseFloat(this.total.toFixed(2));
    this.items.splice(x, 1);
    this.billUpdateListener.next({ bill: [...this.items], Total: this.total });
  }
}
