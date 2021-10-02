/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentMarksService } from './student-marks.service';

describe('Service: StudentMarks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentMarksService]
    });
  });

  it('should ...', inject([StudentMarksService], (service: StudentMarksService) => {
    expect(service).toBeTruthy();
  }));
});
