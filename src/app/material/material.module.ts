import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        Material.MatInputModule,
        Material.MatCardModule,
        Material.MatButtonModule,
        Material.MatToolbarModule,
        Material.MatExpansionModule,
        Material.MatIconModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatProgressSpinnerModule,
        Material.MatDialogModule,
        Material.MatRadioModule,
        Material.MatSelectModule,
    ],

    exports: [
        Material.MatInputModule,
        Material.MatCardModule,
        Material.MatButtonModule,
        Material.MatToolbarModule,
        Material.MatExpansionModule,
        Material.MatIconModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatProgressSpinnerModule,
        Material.MatDialogModule,
        Material.MatRadioModule,
        Material.MatSelectModule,
    ],

    declarations: []
})

export class MaterialModule{}