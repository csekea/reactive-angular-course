import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private readonly coursesUrl = '/api/courses';
    private readonly lessonsUrl = '/api/lessons';

    constructor(private http: HttpClient) {}

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.coursesUrl)
        .pipe(
            map(res => res['payload']),
            shareReplay()
        );
    }

    getCourse(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.coursesUrl}/${id}`)
        .pipe(
            shareReplay()
        );
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
        return this.http.patch<Course>(`${this.coursesUrl}/${courseId}`, changes)
        .pipe(
            shareReplay()
        );
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.coursesUrl, course);
    }

    getLessonsByCourse(courseId: number): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(this.lessonsUrl, {
            params: {
                courseId: courseId.toString(),
                pageSize: "100000"
            }
        })
        .pipe(
            map(res => res["payload"]),
            shareReplay()
        )
    }

    searchLessons(search: string): Observable<Lesson[]>{
        return this.http.get<Lesson[]>(this.lessonsUrl, {
            params: {
                filter: search,
                pageSize: "100"
            }
        })
        .pipe(
            map(res => res["payload"]),
            shareReplay()
        )
    }
}