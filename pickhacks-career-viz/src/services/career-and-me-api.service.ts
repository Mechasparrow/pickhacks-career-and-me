import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerAndMeApiService {
  readonly BASE_URL:string = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  async grabFieldOfStudy() : Promise<string[]> {
    let fields_of_study_promise = firstValueFrom(this.http.get(this.BASE_URL + "/fields-of-study-list"));

    return <string[]>(await fields_of_study_promise);
  }

  async grabMajorFromFieldOfStudy(field_of_study:string): Promise<string[]> {
    let major_list_promise = firstValueFrom(this.http.get(this.BASE_URL + "/majors-for-fields-of-study" + "?field=" + field_of_study));

    return <string[]>(await major_list_promise);
  }
}
