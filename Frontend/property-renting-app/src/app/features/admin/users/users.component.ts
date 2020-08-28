import { Component, OnInit } from '@angular/core';
import { Client } from '@core/model/client';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@core/service/user-service/users.service';
import { GetByRoleMessage, UserMessage } from 'src/proto/user/user_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { UserService } from 'src/proto/user/user_pb_service';
import { environment } from 'src/environments/environment';

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
    this.updateUserTables();
  }

  blockUser(user) {
    this.userService.block(user.id);
    setTimeout(() => {
      this.updateUserTables();
    }, 300);
  }

  unblockUser(user) {
    this.userService.unblock(user.id);
    setTimeout(() => {
      this.updateUserTables();
    }, 300);
  }


  updateUserTables() {

    this.userService.getUsersByType('TENANT').then(value => {
      this.dataSourceTenants = value;
    });

    this.userService.getUsersByType('LANDLORD').then(value => {
      this.dataSourceLandlords = value;
    });

  }

}
