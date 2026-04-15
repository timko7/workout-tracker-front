import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { WorkoutService } from '../../../../core/services/workout.service';
import { Router } from '@angular/router';
import { ExerciseType, Workout } from '../../../../core/models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent],
  templateUrl: './workout-list.html',
  styleUrl: './workout-list.css',
})
export class WorkoutListComponent implements OnInit {
  private workoutService = inject(WorkoutService);

  workouts = signal<Workout[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  
  showForm = signal(false);

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.workoutService.getWorkouts().subscribe({
      next: (workouts) => {
        const sorted = workouts.sort((a, b) => 
          new Date(b.workoutDate).getTime() - new Date(a.workoutDate).getTime()
        );
        this.workouts.set(sorted);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Greška prilikom učitavanja treninga.');
        this.isLoading.set(false);
      }
    });
  }

  openAddForm(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  onWorkoutSaved(): void {
    this.closeForm();
    this.loadWorkouts();
  }

  getExerciseTypeLabel(type: ExerciseType): string {
    const labels: Record<ExerciseType, string> = {
      [ExerciseType.Cardio]: 'Kardio',
      [ExerciseType.Strength]: 'Snaga',
      [ExerciseType.Flexibility]: 'Fleksibilnost'
    };
    return labels[type];
  }

  getIntensityClass(intensity: number): string {
    if (intensity <= 3) return 'intensity-low';
    if (intensity <= 6) return 'intensity-medium';
    return 'intensity-high';
  }

  getFatigueClass(fatigue: number): string {
    if (fatigue <= 3) return 'fatigue-low';
    if (fatigue <= 6) return 'fatigue-medium';
    return 'fatigue-high';
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);

    return d.toLocaleDateString('sr-RS', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
