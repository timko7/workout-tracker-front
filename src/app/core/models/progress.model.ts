export interface WeeklyProgress {
  weekNumber: number;
  totalDuration: number;
  workoutCount: number;
  averageIntensity: number;
  averageFatigue: number;
}

export interface ProgressRequest {
  month: number; // 1-12
  year: number;
}