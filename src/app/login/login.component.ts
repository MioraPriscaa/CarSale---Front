import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [MatButtonModule, NgIf],
  standalone: true,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  changeState: boolean = false;
  form = 'height: 100%; left: 5%';
  info = 'right: 2%; height: 70%; bottom: 2%; color: white';
  divstyle = 'divstyle-login';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let boolValue: boolean = params['isLogon'] === 'true' ? true : false;
      this.changeState = boolValue;
      this.makeChangeState();
    });
  }

  goBackHome() {
    this.router.navigateByUrl('');
  }

  makeChangeState() {
    if (this.changeState) {
      this.form = 'height: 100%; left: 55%; ';
      this.info =
        'right: 100%; height: 70%; bottom: 100%; color: white; transform: translate(105%, 102%)';
      this.divstyle = 'divstyle-logon';
    } else {
      this.form = 'height: 100%; left: 5%';
      this.info = 'right: 2%; height: 70%; bottom: 2%; color: white';
      this.divstyle = 'divstyle-login';
    }
  }
}
