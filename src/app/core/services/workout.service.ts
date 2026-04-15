import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateWorkoutRequest, Workout } from '../models/workout.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/workouts`;

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiUrl);
  }

  getWorkoutById(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/${id}`);
  }

  createWorkout(workout: CreateWorkoutRequest): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout);
  }

}
