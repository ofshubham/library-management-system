import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Globleservices } from "src/services/globleservices";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "./header.component.css"],
})
export class HeaderComponent implements OnInit {
  id;
  type;
  menu = [];
  constructor(
    private route: ActivatedRoute,
    private service: Globleservices,
    private router: Router
  ) {
    this.type = localStorage.getItem("type");
    if (this.type == 1) {
      this.menu = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Books", link: "/books" },
        {
          title: "Issued",
          link: "/issued/" + localStorage.getItem("userid"),
        },
        {
          title: "History",
          link: "/history/" + localStorage.getItem("userid"),
        },
      ];
    } else {
      this.menu = [
        { title: "Dashboard", link: "/admin/dashboard" },
        { title: "Books", link: "/admin/books" },
        { title: "Issued Books", link: "/admin/issuedbooks" },
        { title: "Requests", link: "/admin/issuerequest" },
        { title: "History", link: "/admin/history" },
        { title: "Users", link: "/admin/users" },
      ];
    }
  }

  ngOnInit() {}

  logout() {
    this.service.logout();
    window.location.replace(window.location.origin);
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
