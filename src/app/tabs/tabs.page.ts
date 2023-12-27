import { Component } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  userType!: string;

  constructor(userManagementService: UserManagementService) {
    this.userType = userManagementService.userType;
    console.log('TabsPage - User Type:', this.userType);
  }
}
