import { Component, OnInit } from "@angular/core";
import { Globleservices } from "src/services/globleservices";
import { Router } from "@angular/router";

@Component({
  selector: "app-issuebook",
  templateUrl: "./issuedbook.component.html",
  styleUrls: ["./issuedbook.component.css"],
})
export class IssuedbookComponent implements OnInit {
  defaultContent;
  issuedbookdata = {
    modulename: "issued",
    tabletitle: "Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons: [
      {
        title: "Return",
        icon: "fas fa-edit",
        class: "btn btn-primary",
        type: "return",
      },
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns: [
      { name: "title", lable: "Title" },
      { name: "issuedate", lable: "Issue Date" },
      { name: "issuedays", lable: "Days" },
      { name: "action", lable: "Actions" },
    ],
  };
  constructor(private service: Globleservices, private router: Router) {
    // this.service.getById("issuedbookuser",localStorage.getItem('userid'),(res)=>{
    //   this.issuedbookdata['data']=res;
    // });
  }

  ngOnInit() {}
  actionTable(data) {
    // console.log(data.data[3]);
    this.service.getById("returnBook", data.data[3], (a) => {
      if (a.msg == "SUCCESS") location.reload();
      else {
        console.log("Error");
      }
    });
  }
}
