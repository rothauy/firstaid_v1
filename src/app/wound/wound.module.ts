import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WoundComponent } from './wound.component';
import { WoundListComponent } from './wound-list/wound-list.component';
import { WoundItemComponent } from './wound-list/wound-item/wound-item.component';
import { WoundDetailComponent } from './wound-detail/wound-detail.component';
import { WoundCreateComponent } from './wound-create/wound-create.component';

import { MaterialModule } from '../material/material.module';
import { DropdownDirective } from '../shared/dropdown.directive';

@NgModule({
    declarations: [ 
        WoundComponent,
        WoundListComponent,
        WoundItemComponent,
        WoundDetailComponent,
        WoundCreateComponent,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
    ],
    exports: [
        DropdownDirective
    ],
    entryComponents: [WoundCreateComponent]
})

export class WoundModule {}