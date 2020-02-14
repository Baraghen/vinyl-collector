import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private auth: AuthService) { }

  openNav() {
    if (window.screen.width <= 768) {
      let navRef = document.getElementsByClassName('sideNav')[0] as HTMLElement;
      navRef.classList.add('showNav');
    }
  }
  closeNav() {
    if (window.screen.width <= 768) {
      let navRef = document.getElementsByClassName('sideNav')[0] as HTMLElement;
      navRef.classList.remove('showNav');
    }
  }

  ngOnInit() {
  }

}
