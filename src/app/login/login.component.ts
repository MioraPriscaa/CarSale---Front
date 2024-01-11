import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [MatButtonModule],
  standalone: true,
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {}
