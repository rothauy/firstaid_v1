import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import { Wound } from 'src/app/wound/wound.model';

@Component({
  selector: 'app-image-uploaded',
  templateUrl: './image-uploaded.component.html',
  styleUrls: ['./image-uploaded.component.css']
})
export class ImageUploadedComponent implements OnInit, OnDestroy {
  @Output() typeWasSelected = new EventEmitter<Wound>();

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

  ngOnDestroy() {

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
    this.resultService.getResult(this.form.value.image).subscribe(result => {
      this.typeWasSelected.emit(result.wound);
    });
  }


}
