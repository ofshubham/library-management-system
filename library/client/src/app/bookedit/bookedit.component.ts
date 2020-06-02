import { Component, OnInit } from "@angular/core";
import { Globleservices } from "src/services/globleservices";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-bookedit",
  templateUrl: "./bookedit.component.html",
  styleUrls: ["./bookedit.component.css"],
})
export class BookeditComponent implements OnInit {
  bookForm: FormGroup;
  bookid;
  bookdetails;
  defaultContent;
  isbn;
  bookdata = {
    modulename: "bookforedit",
    tabletitle: "Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons: [
      {
        title: "Delete",
        icon: "fas fa-edit",
        class: "btn btn-primary",
        type: "delete",
      },
    ],
    // buttons:[],
    columns: [
      { name: "_id", lable: "ID" },
      { name: "Type", lable: "type" },
      { name: "Status", lable: "status" },
      { name: "action", lable: "Actions" },
    ],
  };
  constructor(
    private service: Globleservices,
    private router: Router,
    private route: ActivatedRoute,
    private fbuilder: FormBuilder
  ) {
    this.buildForm();
    this.route.params.subscribe((a) => {
      if (a.id) {
        this.service.getById("books", a.id, (data) => {
          this.bookid = a.id;
          console.log(a);
          this.bookdetails = data;
          this.isbn = data.data.isbn;
          this.setform();
        });
      }
    });
  }
  buildForm() {
    this.bookForm = this.fbuilder.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      author: ["", [Validators.required, Validators.maxLength(12)]],
      isbn: ["", [Validators.required, Validators.maxLength(12)]],
      reading: ["", [Validators.required]],
      issue: ["", [Validators.required]],
    });
  }
  setform() {
    this.bookForm.controls["title"].setValue(this.bookdetails.data.title);
    this.bookForm.controls["author"].setValue(this.bookdetails.data.author);
    this.bookForm.controls["isbn"].setValue(this.bookdetails.data.isbn);
    this.bookForm.controls["reading"].setValue(0);
    this.bookForm.controls["issue"].setValue(0);
  }
  ngOnInit() {}
  edit() {
    if (this.isbn != this.bookForm.controls["isbn"].value) {
      this.service.getById("bookByISBN", this.isbn, (a) => {
        if (a.status == "NotPresent") {
          var data1 = {};
          data1["_id"] = this.bookid;
          data1["title"] = this.bookForm.controls.title.value;
          data1["author"] = this.bookForm.controls.author.value;
          data1["isbn"] = this.bookForm.controls.isbn.value;
          data1["reading"] = this.bookForm.controls.reading.value;
          data1["issue"] = this.bookForm.controls.issue.value;
          this.service.postdata("updatebook", data1, (a) => {
            if (a.status == "success") location.reload();
            else alert("Server Error, Please try again later");
          });
        } else {
          alert("ISBN already taken");
          return;
        }
      });
    } else {
      var data1 = {};
      data1["_id"] = this.bookid;
      data1["title"] = this.bookForm.controls.title.value;
      data1["author"] = this.bookForm.controls.author.value;
      data1["isbn"] = this.bookForm.controls.isbn.value;
      data1["forReading"] = this.bookForm.controls.reading.value;
      data1["forIssue"] = this.bookForm.controls.issue.value;
      console.log(data1);
      this.service.putdata("books", data1, (a) => {
        // console.log(a);
        if (a.msg == "SUCCESS") location.reload();
        else alert("Server Error, Please try again later");
      });
    }
  }
  actionTable(data) {
    var data1 = {};
    data1["mainBookId"] = this.bookid;
    data1["childBookId"] = data.data[0];
    this.service.putdata("pullBooks", data1, (response) => {
      if (response.msg == "SUCCESS") {  
        if (response.data) {
          location.reload();
        } else {
          this.router.navigate(["/admin/book"]);
        }
      } else {
        alert("Server error, Please try again later");
      }
    });
  }
}
