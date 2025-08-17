import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private readonly apiUrl = '/api/courses';

    constructor(private http: HttpClient) {}

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl)
        .pipe(
            map(res => res['payload']),
            shareReplay()
        );
    }

    getCourse(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
        return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, changes)
        .pipe(
            shareReplay()
        );
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.apiUrl, course);
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
    }

    deleteCourse(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}