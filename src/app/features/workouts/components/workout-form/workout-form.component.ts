import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../../../core/services/workout.service';
import { CreateWorkoutRequest, ExerciseType, UpdateWorkoutRequest, Workout } from '../../../../core/models/workout.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})
export class WorkoutFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private workoutService = inject(WorkoutService);

  workout: Workout | null = null;
  @Output() workoutSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  workoutForm!: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  
  ExerciseType = ExerciseType;
  exerciseTypes = [
    { value: 1, label: 'Kardio' },
    { value: 2, label: 'Snaga' },
    { value: 3, label: 'Fleksibilnost' }
  ];

  intensityLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  fatigueLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
    console.log(localDateTime)
    this.workoutForm = this.fb.group({
      exerciseType: [this.workout?.exerciseType || ExerciseType.Cardio, Validators.required],
      durationInMinutes: [this.workout?.durationInMinutes || 30, [Validators.required, Validators.min(1)]],
      caloriesBurned: [this.workout?.caloriesBurned || 200, [Validators.required, Validators.min(0)]],
      intensity: [this.workout?.intensity || 5, [Validators.required, Validators.min(1), Validators.max(10)]],
      fatigue: [this.workout?.fatigue || 5, [Validators.required, Validators.min(1), Validators.max(10)]],
      notes: [this.workout?.notes || ''],
      date: [this.workout ? this.formatDateForInput(this.workout.workoutDate) : localDateTime, Validators.required]
    });
  }

  formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    console.log(new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString())
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
  }

  get formTitle(): string {
    return 'Dodaj Trening';
  }

  onSubmit(): void {
    if (this.workoutForm.invalid) {
      this.workoutForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const formValue = this.workoutForm.value;
    const workoutData = {
      exerciseType: Number(formValue.exerciseType),
      durationInMinutes: formValue.durationInMinutes,
      caloriesBurned: formValue.caloriesBurned,
      intensity: formValue.intensity,
      fatigue: formValue.fatigue,
      notes: formValue.notes || '',
      // date: new Date(formValue.date).toISOString().slice(0, 19).concat("", "Z")
      workoutDate: new Date(formValue.date).toISOString()
    };

    const createRequest: CreateWorkoutRequest = workoutData;

    this.workoutService.createWorkout(createRequest).subscribe({
      next: () => {
        this.workoutSaved.emit();
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Greška prilikom dodavanja treninga.');
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getIntensityLabel(value: number): string {
    if (value <= 3) return 'Lak';
    if (value <= 6) return 'Umeren';
    return 'Težak';
  }

  getFatigueLabel(value: number): string {
    if (value <= 3) return 'Malo umoran';
    if (value <= 6) return 'Umereno umoran';
    return 'Vrlo umoran';
  }
}
