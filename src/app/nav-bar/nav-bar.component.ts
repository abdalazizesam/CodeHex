import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(private authService: AuthService){}

   faBars = faBars;
   
   ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated= !!user;
    console.log(!user);
    console.log(!!user);
    });
   }

   onLogout(){
    this.authService.logout();
   }

   ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  }
