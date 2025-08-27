import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import { map, startWith, tap } from 'rxjs/operators';
import {Observable, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    standalone: false
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {


  }

  ngOnInit() {

    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.coursesService.getCourse(courseId)
      .pipe(
        startWith(null)
      );

    const lessons$ = this.coursesService.getLessonsByCourse(courseId)
      .pipe(
        startWith([])
      );

    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      );

  }


}











