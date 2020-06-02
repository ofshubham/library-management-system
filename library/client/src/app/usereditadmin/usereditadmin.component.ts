import { Component, OnInit } from "@angular/core";
import { Globleservices } from "src/services/globleservices";
import { Router, ActivatedRoute } from "@angular/router";
declare var $;
@Component({
  selector: "app-usereditadmin",
  templateUrl: "./usereditadmin.component.html",
  styleUrls: ["./usereditadmin.component.css"],
})
export class UsereditadminComponent implements OnInit {
  date;
  _self;
  startDate;
  date1;
  id;
  constructor(
    private service: Globleservices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((a) => {
      if (a.id) {
        this.id = a.id;
      }
    });
    // this.startDate = new Date(2000, 0, 2);
  }

  ngOnInit() {}
  edit() {
    console.log(this.id);
    // var date2 = this.date1.toString()

    // console.log({id:localStorage.getItem('userid'),'date1':date2})
    this.service.putdata(
      "members",
      { id: this.id, expression: { membershipexpire: this.date1 } },
      (a) => {
        if (a.msg == "SUCCESS") {
          console.log("s");
        } else {
          console.log("e");
        }
        // this.router.navigate(["/admin/users"]);
      }
    );
    // console.log(this.date1)
  }
}
