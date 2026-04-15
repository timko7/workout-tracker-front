import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { ProgressRequest, WeeklyProgress } from "../models/progress.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProgressService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/progress`;

    getMonthlyProgress(request: ProgressRequest): Observable<WeeklyProgress[]> {
    const params = new HttpParams()
      .set('month', request.month.toString())
      .set('year', request.year.toString());

    return this.http.get<WeeklyProgress[]>(`${this.apiUrl}`, { params });
  }
}