import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentChange, QuillModule, SelectionChange } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:true,
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
  imports:[CommonModule, ReactiveFormsModule, NgSelectModule, QuillModule, NgbAccordionModule]
})
export class ShipmentComponent implements OnInit {
  validationForm: any;
  isFormSubmitted: Boolean = false;
  apiPath: string = environment.baseURL;
  @Input() show: boolean = false;
  @Input() states = [];
  originCities=[];
  destinationCities=[];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      originAddress: [, Validators.required],
      originZip: [, Validators.required],
      originStateId: [null, Validators.required],
      originCityName: [, Validators.required],
      destinationAddress: [, Validators.required],
      destinationZip: [, Validators.required],
      destinationStateId: [null, Validators.required],
      destinationCityName: [, Validators.required],
      height: [, Validators.required],
      width: [, Validators.required],
      length: [, Validators.required],
      weight: [, Validators.required],
      isHazmat: [false],
      comodity: [, Validators.required],
      comments: []
    });
  }

  get shipmentForm() {
    return this.validationForm.controls;
  }
  
  formSubmit(event:any) {
    if (this.validationForm.valid) {
    }
    this.isFormSubmitted = true;
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
