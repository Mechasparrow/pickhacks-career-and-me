import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  states: String[] = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  fields_of_study: String[] = ['Agriculture','Architecture','Biology','Business','Communications','Communications technology','Computer and information technology','Construction','Culture and gender studies','Education','Engineering','Engineering technologies','English','Family and consumer sciences','Fine and performing arts','Foreign language','Healthcare and related','History','Interdisciplinary studies'];

  form = new FormGroup({});
  model = { state: 'Missouri', field_of_study: 'Architecture'};
  fields: FormlyFieldConfig[] = [
    {
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
    },
    {
      key: 'field_of_study',
      className: "FormField",
      type: 'select',
      templateOptions: {
        label: 'Choose your Field of Study',
        placeholder: 'Architecture',
        required: true,
        options: this.fields_of_study.map(fields_of_study => {
          return {value: fields_of_study, label: fields_of_study}
        })
      }
    }
  ];

  ngOnInit(): void {
    
  }

  onSubmit(model:any) {
    console.log(model);
  }

  constructor() { }


}
