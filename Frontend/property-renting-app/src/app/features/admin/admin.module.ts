import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { CreatePropertyTypeDialogComponent } from './create-property-type-dialog/create-property-type-dialog.component';


@NgModule({
  declarations: [AdminDashboardComponent, UsersComponent, CommentsComponent, PropertyTypesComponent, CreatePropertyTypeDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreatePropertyTypeDialogComponent
  ]
})
export class AdminModule { }
