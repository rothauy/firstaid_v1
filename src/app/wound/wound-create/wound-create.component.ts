import { Component, OnInit } from '@angular/core';
import { Wound } from '../wound.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WoundService } from '../wound.service';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-wound-create',
  templateUrl: './wound-create.component.html',
  styleUrls: ['./wound-create.component.css']
})
export class WoundCreateComponent implements OnInit {
  enteredType = "";
  enteredDesc = "";
  imagePreview: string;

  wound: Wound;
  isLoading = false;

  form: FormGroup;
  private mode = "create";
  private woundId: string;

  constructor(
    public woundsService: WoundService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("woundId")) {
        this.mode = "edit";
        this.woundId = paramMap.get("woundId");
        this.isLoading = true;
        this.woundsService.getWound(this.woundId).subscribe(woundData => {
          this.isLoading = false;
          this.wound = {
            id: woundData._id,
            type: woundData.type,
            description: woundData.description,
            imagePath: woundData.imagePath
          },
          this.form.setValue({
            type: this.wound.type,
            description: this.wound.description,
            imagePath: this.wound.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.woundId = null;
      }
    })
  }

  onClose() {
  }

  onSaveWound() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.woundsService.addWound(
        this.form.value.type,
        this.form.value.description,
        this.form.value.imagePath
      );
    } else {
    };
    this.form.reset;
  }

  onImagePicked() {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
