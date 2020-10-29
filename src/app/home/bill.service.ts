import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Bill } from "./bill.model";

@Injectable({
  providedIn: "root",
})
export class BillService {
  items: Bill[] = [];
  billUpdateListener = new Subject();
  constructor() {}
  billupdated() {
    return this.billUpdateListener.asObservable();
  }
  getDetails(id: string, qty: number) {
    const rate = 123;
    const tax = (5 / 100) * rate * qty;
    const amt = rate * qty + tax;
    const data: Bill = {
      ItemName: id,
      Qty: qty,
      Rate: rate,
      Taxpercent: "5%",
      Tax: tax,
      Amt: amt,
    };
    this.items.push(data);
    this.billUpdateListener.next([...this.items]);
  }
}
