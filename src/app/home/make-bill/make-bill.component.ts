import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BillService } from "../bill.service";

@Component({
  selector: "app-make-bill",
  templateUrl: "./make-bill.component.html",
  styleUrls: ["./make-bill.component.scss"],
})
export class MakeBillComponent implements OnInit {
  constructor(private billService: BillService) {}

  ngOnInit(): void {}
  addItem(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.billService.getDetails(form.value.item, form.value.qty);
    }
  }
}
