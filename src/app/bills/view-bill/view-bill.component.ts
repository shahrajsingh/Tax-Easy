import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Bill } from "src/app/home/bill.model";
import { BillService } from "src/app/home/bill.service";
@Component({
  selector: "app-view-bill",
  templateUrl: "./view-bill.component.html",
  styleUrls: ["./view-bill.component.scss"],
})
export class ViewBillComponent implements OnInit {
  data = { userId: null, billid: null };
  bill: Bill[] = [];
  d = new Date();
  CompanyName: string;
  Date: string;
  Address: string;
  total: number;
  InvoiceNumber: string;
  isLoading: boolean = true;
  IssuedTo: string;

  constructor(
    private route: ActivatedRoute,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.data.billid = paramMap.get("id");
        this.billService.getBill(this.data.billid).subscribe(
          (res) => {
            this.Address = res.Address;
            this.CompanyName = res.CompanyName;
            this.Date = res.result.IssueDate;
            this.IssuedTo = res.result.IssuedTo;
            this.total = res.result.Total;
            this.bill = res.result.Items;
            this.InvoiceNumber = res.result._id;
            this.isLoading = false;
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      }
    });
  }
  print() {
    window.print();
  }
}
