import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentChange, QuillModule, SelectionChange } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone:true,
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
  imports:[CommonModule, ReactiveFormsModule, NgSelectModule, QuillModule]
})
export class ShipmentComponent implements OnInit {
  validationForm: UntypedFormGroup;
  isFormSubmitted: Boolean;
  apiPath: string = environment.baseURL;
  @Input() show: boolean;
  @Input() cities:any = [];
  @Input() states = [];
  originCities=[];
  destinationCities=[];
  @Input() comodities = [];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      originAddress: [],
      originZip: [],
      originStateId: [],
      originCityId: [],
      destinationAddress: [],
      destinationZip: [],
      destinationStateId: [],
      destinationCityId: [],
      height: [],
      width: [],
      length: [],
      weight: [],
      isHazmat: [],
      comodityId: [],
      comments: []
    });
  }

  get form() {
    return this.validationForm.controls;
  }
  
  formSubmit(event:any) {
    if (this.validationForm.valid) {
    }
    this.isFormSubmitted = true;
  }

  originStateChange(value:any){
    this.originCities = this.cities.filter((s:any) => s.stateId == value.id);
  }

  destinationStateChange(value:any){
    this.destinationCities = this.cities.filter((s:any) => s.stateId == value.id);
  }

  onSelectionChanged = (event: SelectionChange) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }
  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        //['link', 'image', 'video']
      ],
    },
  }

}