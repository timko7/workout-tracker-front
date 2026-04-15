import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated$ = this.authService.isAuthenticated$;

  currentUser = computed(() => this.authService.currentUser());

  onLogout(): void {
    this.authService.logout();
  }

  navigateToWorkouts(): void {
    this.router.navigate(['/workouts']);
  }

  navigateToProgress(): void {
    this.router.navigate(['/progress']);
  }
}
