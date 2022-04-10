import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { CareerAndMeApiService } from 'src/services/career-and-me-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  states: String[] = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  
  form = new FormGroup({});
  model = { 
    state: 'Missouri', 
    field_of_study: '' , 
    major:'',
    job_title: '',
    job_occupation: ''
  };

  state_config: FormlyFieldConfig = {
    key: 'state',
    className: "FormField",
    type: 'select',
    templateOptions: {
      label: 'Choose your State',
      placeholder: 'Minnesota',
      required: true,
      options: this.states.map(state => {
        return {value: state, label: state}
      })
    }
  };

  field_of_study_config: FormlyFieldConfig = {
    key: 'field_of_study',
    className: "FormField",
    type: 'select',
    templateOptions: {
      label: 'Choose your Field of Study',
      placeholder: 'Architecture',
      required: true,
      options: []
    },
    hide: true
  }

  major_field_config: FormlyFieldConfig = {
    key: 'major',
    className: "FormField",
    type: 'select',
    templateOptions: {
      label: 'Choose your Major',
      placeholder: 'Comp Sci',
      required: true,
      options: []
    },
    hide: true
  }

  fields: FormlyFieldConfig[] = [
    this.state_config,
    this.field_of_study_config,
    this.major_field_config
  ];

  async ngOnInit(): Promise<void> {
    await this.initFieldOfStudy();

    this.form.valueChanges.subscribe(async value_change => {
      let current_field: string = value_change["field_of_study"]

      if (current_field != ''){  
        await this.initMajor(current_field);
      }

    })
  }

  private async initMajor(current_field:string): Promise<void> {
    let majors = await this.meApi.grabMajorFromFieldOfStudy(current_field);

    this.major_field_config.templateOptions = {
      label: 'Choose your Field of Study',
      required: true,
      options: majors.map(field => {return {value: field, label:field}})
    };

    this.major_field_config.hide = false
  }

  private async initFieldOfStudy(): Promise<void> {
    let fields_of_study = await this.meApi.grabFieldOfStudy();

    this.field_of_study_config.templateOptions = {
      label: 'Choose your Field of Study',
      required: true,
      options: fields_of_study.map(field => {return {value: field, label:field}})
    };

    this.field_of_study_config.hide = false

  }

  onSubmit(model:any) {
    console.log(model);
  }

  constructor(private meApi: CareerAndMeApiService) { 

  }


}
