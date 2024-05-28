import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';

export interface Ticket {
  id?: any;
  title?: string;
  description?: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'backlog' | 'ready' | 'inprogress' | 'block' | 'test' | 'done';
}

@Component({
  selector: 'app-amplify-ticket-management',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AmplifyAuthenticatorModule,
  ],
  templateUrl: './amplify-ticket-management.component.html',
  styleUrl: './amplify-ticket-management.component.css',
})
export class AmplifyTicketManagementComponent {
  @ViewChild('ticketForm') ticketForm!: NgForm; // ViewChild for accessing the form
  // tickets: any[] = [];
  loading = false;
  tickets: any = {
    backlog: [],
    ready: [],
    inprogress: [],
    block: [],
    test: [],
    done: [],
  };
  statuses: string[] = [
    'backlog',
    'ready',
    'inprogress',
    'block',
    'test',
    'done',
  ];
  ticketData: any = {};
  isEditMode: boolean = false;
  client!: any;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.client = generateClient<Schema>();
    this.loadTicket();
  }

  loadTicket() {
    try {
      this.loading = true;
      this.client.models.Ticket.observeQuery().subscribe({
        next: (res: any) => {
          const allTickets: any[] = res.items;
          this.statuses.forEach((status) => {
            this.tickets[status] = allTickets.filter(
              (ticket: { status: string }) => ticket.status === status
            );
          });
          this.loading = false;
          console.log(this.tickets);
        },
      });
    } catch (error) {
      this.loading = false;
      console.error('error fetching tickets', error);
    }
  }

  saveTicket(): void {
    if (this.isEditMode && this.ticketData['id'] !== undefined) {
      console.log(this.ticketData);
      this.updateTickets();
    } else {
      console.log(this.ticketData);
      this.createTickets();
    }
    this.resetForm();
    this.loadTicket();
  }

  updateTickets() {
    try {
      this.client.models.Ticket.update(this.ticketData);
      this.loadTicket();
    } catch (error) {
      console.error('error updating ticket', error);
    }
  }

  createTickets() {
    try {
      this.client.models.Ticket.create(this.ticketData);
      this.loadTicket();
    } catch (error) {
      console.error('error creating ticket', error);
    }
  }

  editTicket(ticket: Ticket): void {
    this.ticketData = { ...ticket };
    this.isEditMode = true;
  }

  // deleteTicket(id: any): void {
  //   this.ticketService.deleteTicket(id);
  //   this.loadTicket();
  // }

  resetForm(): void {
    this.ticketData = {};
    this.isEditMode = false;
    // Clear form validation state
    if (this.ticketForm) {
      this.ticketForm.form.markAsPristine();
      this.ticketForm.form.markAsUntouched();
    }
  }

  deleteTickets(id: string) {
    try {
      this.client.models.Ticket.delete({
        id: id,
      });
      this.loadTicket();
    } catch (error) {
      console.error('error creating ticket', error);
    }
  }
}
