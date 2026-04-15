import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeeklyProgress } from '../../../../core/models/progress.model';
import { ProgressService } from '../../../../core/services/progress.service';

@Component({
  selector: 'app-progress-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './progress-view.html',
  styleUrl: './progress-view.css',
})
export class ProgressViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private progressService = inject(ProgressService);

  progressForm!: FormGroup;
  weeklyProgress = signal<WeeklyProgress[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  months = [
    { value: 1, label: 'Januar' },
    { value: 2, label: 'Februar' },
    { value: 3, label: 'Mart' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Maj' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Avgust' },
    { value: 9, label: 'Septembar' },
    { value: 10, label: 'Oktobar' },
    { value: 11, label: 'Novembar' },
    { value: 12, label: 'Decembar' }
  ];

  years = signal<number[]>([]);

  hasData = computed(() => this.weeklyProgress().length > 0);

  ngOnInit(): void {
    this.generateYears();
    this.initializeForm();
    this.loadProgress();
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear - 2; i <= currentYear + 1; i++) {
      yearsList.push(i);
    }
    this.years.set(yearsList);
  }

  initializeForm(): void {
    const now = new Date();
    this.progressForm = this.fb.group({
      month: [now.getMonth() + 1, Validators.required],
      year: [now.getFullYear(), Validators.required]
    });
  }

  loadProgress(): void {
    if (this.progressForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { month, year } = this.progressForm.value;

    this.progressService.getMonthlyProgress({ month, year }).subscribe({
      next: (progress) => {
        this.weeklyProgress.set(progress);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Greška prilikom učitavanja podataka o napretku.');
        this.isLoading.set(false);
        this.weeklyProgress.set([]);
      }
    });
  }

  onFilterChange(): void {
    this.loadProgress();
  }

  getSelectedMonthLabel(): string {
    const monthValue = this.progressForm.get('month')?.value;
    const month = this.months.find(m => m.value == monthValue);
    return month ? month.label : '';
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

  formatNumber(value: number): string {
    return value.toFixed(1);
  }
}
