import { Component, OnInit } from "@angular/core";
import { Globleservices } from "src/services/globleservices";
import { Router } from "@angular/router";

@Component({
  selector: "app-userhistory",
  templateUrl: "./userhistory.component.html",
  styleUrls: ["./userhistory.component.css"],
})
export class UserhistoryComponent implements OnInit {
  defaultContent;
  userhistorydata = {
    modulename: "usersH",
    tabletitle: "Book List",
    buttons: [
      {
        title: "Delete",
        icon: "fas fa-edit",
        class: "btn btn-primary",
        type: "delete",
      },
    ],
    columns: [
      { name: "title", lable: "Title" },
      { name: "issuedate", lable: "Issue Date" },
      { name: "returndate", lable: "Returned At" },
      { name: "action", lable: "Actions" },
    ],
  };
  constructor(private service: Globleservices, private router: Router) {}

  ngOnInit() {}
  actionTable(data) {
    console.log(data);
    this.service.getById("deleteH", data.data[4], (a) => {
      if (a.msg == "SUCCESS") location.reload();
      else {
        alert("server error, please try again later");
      }
    });
  }
}
