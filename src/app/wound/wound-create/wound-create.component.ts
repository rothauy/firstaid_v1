import { Component, OnInit, Inject } from '@angular/core';
import { Wound } from '../wound.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WoundService } from '../wound.service';
import { mimeType } from 'src/app/shared/mime-type.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-wound-create',
  templateUrl: './wound-create.component.html',
  styleUrls: ['./wound-create.component.css']
})
export class WoundCreateComponent implements OnInit {
  imagePreview: string;

  wound: Wound;
  isLoading = false;
  breakpoint: number;
  matFormHeight: string;

  form: FormGroup;
  private mode = "create";
  private woundId: string;
  

  constructor(
    public woundsService: WoundService,
    public dialogRef: MatDialogRef<WoundCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wound) {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 940) ? 1 : 2;
    if (this.breakpoint === 1) {
      this.matFormHeight = "220px";
    } else {
      this.matFormHeight = "300px";
    };
    
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
    if (this.data !== null){
      this.mode = "edit";
      this.woundId = this.data.id;
      this.imagePreview = this.data.imagePath;
      this.form.setValue({
        type: this.data.type,
        description: this.data.description,
        image: this.data.imagePath
      });
    } else {
      this.mode = "create";
      this.woundId = null;
    }
  }

  onClose() {
    this.dialogRef.close();
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
        this.form.value.image
      );
    } else {
      this.woundsService.updateWound(
        this.woundId,
        this.form.value.type,
        this.form.value.description,
        this.form.value.image
      )
    };
    this.form.reset();
    this.dialogRef.close();
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

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 940) ? 1 : 2;
    if (this.breakpoint === 1) {
      this.matFormHeight = "220px";
    } else {
      this.matFormHeight = "300px";
    }
  }
}
