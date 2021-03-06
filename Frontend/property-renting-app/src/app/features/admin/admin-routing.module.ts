import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { PropertyTypesComponent } from './property-types/property-types.component';


const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'comments',
        component: CommentsComponent,
        pathMatch: 'full'
      },
      {
        path: 'property-types',
        component: PropertyTypesComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
