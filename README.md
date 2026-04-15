# WorkoutTrackerFront 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

Angular aplikacija za praćenje treninga sa .NET backend-om.

## Instalacija

### Preduslovi
- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)

### Setup

1. **Clone repository:**
```bash
   git clone https://github.com/TVOJ_USERNAME/workout-tracker-front.git
   cd workout-tracker-front
```

2. **Instaliraj dependencies:**
```bash
   npm install
```

3. **Kopiraj i konfiguriši environment fajl:**
```bash
   cp src/environments/environment.example.ts src/environments/environment.development.ts
```
   Ažuriraj `apiUrl` sa tvojim backend URL-om.

4. **Pokreni aplikaciju:**
```bash
   ng serve
```
   Otvori `http://localhost:4200`

## Struktura projekta
src/app/
├── core/           # Services, guards, interceptors, models
├── features/       # Feature modules (auth, workouts, progress) components
├── shared/         # Shared components (navbar)
└── app.routes.ts   # Routing configuration

## Backend

Backend je razvijen u .NET. Za pokretanje backend-a pogledaj backend repository: https://github.com/timko7/WorkoutTracker.




## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
