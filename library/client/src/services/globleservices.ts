import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { flatten } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class Globleservices {
  apiUrl = "http://localhost:3000/api/";
  isadminlogin = false;
  ismemberlogin = false;
  saltKey = "Shubham";
  token;
  headers;

  constructor(private http: HttpClient, private router: Router) {
    if (
      localStorage.getItem("type") == "1" ||
      localStorage.getItem("type") == "2"
    ) {
      if (localStorage.getItem("dcmstoken") != undefined) {
        this.decrypt(localStorage.getItem("dcmstoken"), (des) => {
          this.token = des;
          var userPayload = JSON.parse(atob(this.token.split(".")[1]));
          if (userPayload.exp < Date.now() / 1000) {
            this.ismemberlogin = false;
            this.isadminlogin = false;
            // this.router.navigate(['admin/login']);
          } else {
            if (localStorage.getItem("type") != undefined) {
              if (localStorage.getItem("type") == "1") {
                this.ismemberlogin = true;
              }
              if (localStorage.getItem("type") == "2") {
                this.isadminlogin = true;
              }
            }
            this.headers = new HttpHeaders({
              Authorization: "Bearer " + des,
              "Content-Type": "application/json; charset=utf-8",
            });
          }
        });
      }
    }
  }
  postdata(col, data, callback) {
    this.http
      .post(this.apiUrl + col + "/", data, { headers: this.headers })
      .subscribe((a) => callback(a));
  }
  putdata(col, data, callback) {
    this.http
      .put(this.apiUrl + col + "/", data, { headers: this.headers })
      .subscribe((a) => callback(a));
  }
  // deletedata(col, data, callback) {
  //   this.http.delete(this.apiUrl + col + "/", data, { headers: this.headers })
  //     .subscribe((a) => callback(a));
  // }

  getById(col, id, callback) {
    this.http
      .get(this.apiUrl + col + "/" + id, { headers: this.headers })
      .subscribe((a) => callback(a));
    // this.http.get(this.apiUrl + col  ).subscribe(a => callback(a
    // ));
  }
  getAll(col, callback) {
    this.http
      .get(this.apiUrl + col, { headers: this.headers })
      .subscribe((a) => callback(a));
  }
  login(data, type, callback) {
    if (type == 1) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      });
      this.http
        .post(this.apiUrl + "mlogin", data, { headers: headers })
        .subscribe((a) => {
          // console.log(a);
          if (a["msg"] == "SUCCESS") {
            localStorage.setItem("type", "1");
            localStorage.setItem("userid", a["uid"]);
            this.ismemberlogin = true;
            this.token = a["token"];
            this.headers = new HttpHeaders({
              Authorization: "Bearer " + a["token"],
              "Content-Type": "application/json; charset=utf-8",
            });
            console.log(this.headers);
            this.encrypt(a["token"], (enc) => {
              localStorage.setItem("dcmstoken", enc);
            });
            // window.location.replace(window.location.origin + "/dashboard");
            callback(a["msg"]);
          } else {
            callback(a["msg"]);
          }
        });
    } else if (type == 2) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      });
      this.http
        .post(this.apiUrl + "alogin", data, { headers: headers })
        .subscribe((a) => {
          // console.log(a);
          if (a["msg"] == "SUCCESS") {
            localStorage.setItem("type", "2");
            localStorage.setItem("userid", a["uid"]);
            this.isadminlogin = true;
            this.token = a["token"];
            this.headers = new HttpHeaders({
              Authorization: "Bearer " + a["token"],
              "Content-Type": "application/json; charset=utf-8",
            });
            this.encrypt(a["token"], (enc) => {
              localStorage.setItem("dcmstoken", enc);
            });
            callback(a["msg"]);
          } else {
            callback(a["msg"]);
          }
        });
    }
  }
  logout() {
    this.headers = null;
    localStorage.setItem("type", null);
    localStorage.setItem("userid", null);
    localStorage.setItem("dcmstoken", null);
    return;
  }
  encrypt(string, cal) {
    cal(CryptoJS.AES.encrypt(string, this.saltKey).toString());
  }
  decrypt(string, cal) {
    cal(CryptoJS.AES.decrypt(string, this.saltKey).toString(CryptoJS.enc.Utf8));
  }
}
