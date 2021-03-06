import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { BillsComponent } from "./bills/bills.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { MatBadgeModule } from "@angular/material/badge";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AuthGuard } from "./auth/auth.guard";
import { ToolbarButtonComponent } from "./toolbar-button/toolbar-button.component";
import { MakeBillComponent } from "./home/make-bill/make-bill.component";
import { BillComponent } from "./home/bill/bill.component";

import { AddItemComponent } from "./inventory/add-item/add-item.component";
import { InventoryListComponent } from "./inventory/inventory-list/inventory-list.component";
import { ViewBillComponent } from "./bills/view-bill/view-bill.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    BillsComponent,
    InventoryComponent,
    SidenavComponent,
    LoginComponent,
    SignupComponent,
    ToolbarButtonComponent,
    MakeBillComponent,
    BillComponent,
    AddItemComponent,
    InventoryListComponent,
    ViewBillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule,
    MatSelectModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
