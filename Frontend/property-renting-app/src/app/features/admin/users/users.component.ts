import { Component, OnInit } from '@angular/core';
import { Client } from '@core/model/client';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@core/service/user-service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSourceTenants = new MatTableDataSource<Client>();
  dataSourceLandlords = new MatTableDataSource<Client>();

  displayedColumns: string[] = ['person', 'email', 'phone', 'btnBlockAccount'];

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.userService.getUsersByType('TENANT').then(value => {
      this.dataSourceTenants = value;
    });

    this.userService.getUsersByType('LANDLORD').then(value => {
      this.dataSourceLandlords = value;
    });
  }

  blockUser(user) {

  }

  unblockUser(user) {

  }

}
