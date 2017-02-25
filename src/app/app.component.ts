import { Component, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

//import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
//import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public repos: Repo[];

  public form: FormGroup;
  public inputEvents: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

  onInput($event: KeyboardEvent) {
    this.inputEvents.next($event);
  }

  constructor(private _fb: FormBuilder, private _http: Http) {
    this.form = this._fb.group({ query: [''] });
  }

  ngOnInit() {

    this.inputEvents
      .debounceTime(300)
      .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
      .switchMap((query: string) =>  
        this._http.get('https://api.github.com/search/repositories?q='+query)
      )
      .map(res => res.json())
      .subscribe(res => {this.repos = res.items});
  }
}