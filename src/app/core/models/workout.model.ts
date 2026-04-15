export enum ExerciseType {
  Cardio = 1,
  Strength = 2,
  Flexibility = 3
}

export interface Workout {
  id: string;
  exerciseType: ExerciseType;
  durationInMinutes: number;
  caloriesBurned: number;
  intensity: number; // 1-10
  fatigue: number; // 1-10
  notes?: string;
  workoutDate: Date;
  memberId: string;
}

export interface CreateWorkoutRequest {
  exerciseType: ExerciseType;
  durationInMinutes: number;
  caloriesBurned: number;
  intensity: number;
  fatigue: number;
  notes?: string;
  workoutDate: string; 
}

export interface UpdateWorkoutRequest extends CreateWorkoutRequest {
  id: string;
}