import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavigatorComponent } from 'src/app/shared/navigator/navigator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private athenticationService: AuthenticationService,
    private router: Router) {}
  
  login(username: string) {
    this.athenticationService.login(username).subscribe(() => {
      this.router.navigate(['/playground']);
    });
  }
}
