import { Component } from '@angular/core';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
})
export class OneComponent {
  isFavorite: boolean = false;
  iconEtat: string = 'regular';

  ngOnInit() {}

  changeState() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.iconEtat = 'solid';
    } else {
      this.iconEtat = 'regular';
    }
  }
}
