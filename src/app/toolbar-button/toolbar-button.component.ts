import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-toolbar-button",
  templateUrl: "./toolbar-button.component.html",
  styleUrls: ["./toolbar-button.component.scss"],
})
export class ToolbarButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() text: String;
  @Input() fixedWidth: boolean;
  constructor() {}

  ngOnInit(): void {}
}
