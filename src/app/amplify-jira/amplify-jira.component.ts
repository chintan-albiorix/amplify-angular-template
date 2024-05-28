import { Component } from '@angular/core';
import { AmplifyTicketManagementComponent } from '../amplify-ticket-management/amplify-ticket-management.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-amplify-jira',
  standalone: true,
  templateUrl: './amplify-jira.component.html',
  styleUrl: './amplify-jira.component.css',
  imports: [
    AmplifyTicketManagementComponent,
    RouterModule,
    CommonModule,
    FormsModule,
    AmplifyAuthenticatorModule,
  ],
})
export class AmplifyJiraComponent {
  constructor(public authenticator: AuthenticatorService,){}
}
