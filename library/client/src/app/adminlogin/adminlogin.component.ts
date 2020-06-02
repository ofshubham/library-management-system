import { Component, OnInit } from "@angular/core";
import { Globleservices } from "../../services/globleservices";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY } from "@angular/material";

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.scss"],
})
export class AdminloginComponent implements OnInit {
  loginForm: FormGroup;
  error;
  constructor(
    private service: Globleservices,
    private route: Router,
    private fbuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {}
  buildForm() {
    this.loginForm = this.fbuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.maxLength(12)]],
    });
  }
  login() {
    this.service.login(this.loginForm.value, 2, (msg) => {
      if (msg == "SUCCESS") {
        this.route.navigate(["admin/dashboard"]);
      } else {
        this.error = msg;
        this.loginForm.reset();
      }
    });
  }
  get f() {
    return this.loginForm.controls;
  }
}
