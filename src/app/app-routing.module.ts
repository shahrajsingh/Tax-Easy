import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { BillsComponent } from "./bills/bills.component";
import { ViewBillComponent } from "./bills/view-bill/view-bill.component";
import { HomeComponent } from "./home/home.component";
import { InventoryComponent } from "./inventory/inventory.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomeComponent },
  {
    path: "inventory",
    component: InventoryComponent,
  },
  { path: "bills", component: BillsComponent },
  { path: "viewBill/:id", component: ViewBillComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
