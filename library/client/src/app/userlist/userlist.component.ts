import { Component, OnInit } from "@angular/core";
import { Globleservices } from "src/services/globleservices";
import { Router } from "@angular/router";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"],
})
export class UserlistComponent implements OnInit {
  defaultContent;
  userlist = {
    modulename: "members",
    tabletitle: "Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons: [
      {
        title: "Edit",
        icon: "fas fa-edit",
        class: "btn btn-primary",
        type: "edit",
      },
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns: [
      { name: "name", lable: "Name" },
      { name: "expiredate", lable: "Membership Expiration Date" },
      { name: "created_at", lable: "Membership Hours" },
      { name: "created_at", lable: "Created At" },
      // {name:"status",lable:"Status"},
      { name: "action", lable: "Actions" },
    ],
  };
  constructor(private service: Globleservices, private router: Router) {}

  ngOnInit() {}
  actionTable(data) {
    this.router.navigate(["/admin/users/" + data.data[4]]);
  }
}
