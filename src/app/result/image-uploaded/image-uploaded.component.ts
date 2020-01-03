import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import * as tf from "@tensorflow/tfjs";

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiURL;

@Component({selector: 'app-image-uploaded',
templateUrl: './image-uploaded.component.html',
styleUrls: ['./image-uploaded.component.css']
  
})
export class ImageUploadedComponent implements OnInit {
  @Output() typeWasSelected = new EventEmitter<object>();

  isLoading = false;
  model: tf.LayersModel;
  predictions: any;
  
  form: FormGroup;
  imagePreview: string;

  constructor(public resultService: ResultService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.initModel();
  }

  async initModel() {
    this.isLoading = true;
    this.model = await tf.loadLayersModel(BACKEND_URL + 'tfjs_files/model.json');
    this.isLoading = false;
  }

  async predictModel(image) {
    let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([150,150]).toFloat().expandDims();
    const output = this.model.predict(tensor) as any;
    let max = 0;
    this.predictions = Array.from(output.dataSync())
      .map(function (p, i) {
        return {
          probability: p as number,
          className: i
        };
      }).sort(function (a, b) {
        return b.probability - a.probability;
      });
    
    console.log(this.predictions[0].className);
  }

  onImagePicked(event: Event) {
    this.isLoading = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      const image = new Image();
      image.src = this.imagePreview;
      image.onload = () =>{
        this.predictModel(image);
      };
    };
    this.isLoading = false;
  }

  onSubmit() {
    this.resultService.getResult(this.form.value.image, this.predictions[0].className).subscribe(result => {
      this.typeWasSelected.emit(result.wound);
    });
  }

}
