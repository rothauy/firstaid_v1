import { Component, OnInit } from '@angular/core';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-image-uploaded',
  templateUrl: './image-uploaded.component.html',
  styleUrls: ['./image-uploaded.component.css']
})
export class ImageUploadedComponent implements OnInit {
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
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.resultService.getResult(this.imagePreview));
  }


}
