import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SnackbarService } from "src/app/snackbar.service";
import { BillService } from "../bill.service";

@Component({
  selector: "app-make-bill",
  templateUrl: "./make-bill.component.html",
  styleUrls: ["./make-bill.component.scss"],
})
export class MakeBillComponent implements OnInit {
  constructor(
    private billService: BillService,
    private snackBar: SnackbarService
  ) {}
  isLoading: boolean = true;
  options = [];
  ngOnInit(): void {
    this.billService.getProductNames().subscribe(
      (res) => {
        this.options = res.result;
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.openSnackbar(error.error.message);
      }
    );
  }
  addItem(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      console.log(form.value.item);
      this.billService.getDetails(
        form.value.item,
        form.value.qty,
        form.value.issuedto
      );
    }
  }
  issueInvoice() {
    this.billService.IssueInvoice();
  }
}
