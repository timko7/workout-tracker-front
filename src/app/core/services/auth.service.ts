import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.tokenService.isTokenValid()
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
        this.tokenService.saveUser({
          email: response.email,
          role: response.role
        });
        this.currentUserSignal.set({
          email: response.email,
          role: response.role
        });
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
        this.tokenService.saveUser({
          email: response.email,
          role: response.role
        });
        this.currentUserSignal.set({
          email: response.email,
          role: response.role
        });
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.tokenService.clearStorage();
    this.currentUserSignal.set(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }

  private currentUserSignal = signal<{ email: string; role: string } | null>(
    this.tokenService.getUser()
  );

  currentUser = this.currentUserSignal.asReadonly();

}
