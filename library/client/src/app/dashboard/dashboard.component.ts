import { Component, OnInit } from "@angular/core";
import { Globleservices } from "../../services/globleservices";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  type;
  newBooks;
  constructor(private service: Globleservices) {
    this.type = localStorage.getItem("type");
    if (this.type == "1") {
      this.service.getAll("newBooks", (data) => {
        this.newBooks = data.data;
      });
    }
  }

  ngOnInit() {}
}
