import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../service/ticket.service';

export interface Ticket {
  id: any;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'backlog' | 'ready' | 'inprogress' | 'block' | 'test' | 'done';
}

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.css'
})
export class TicketManagementComponent {
  loading = false;
  tickets: { [key: string]: Ticket[] } = {
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
  ticketData: Partial<Ticket> = {};
  isEditMode: boolean = false;

  constructor(private ticketService: TicketService) {}
  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    const allTickets = this.ticketService.getTickets();
    this.statuses.forEach((status) => {
      this.tickets[status] = allTickets.filter(
        (ticket: any) => ticket.status === status
      );
    });
  }

  saveTicket(): void {
    if (this.isEditMode && this.ticketData.id !== undefined) {
      console.log(this.ticketData);
      this.ticketService.updateTicket(this.ticketData.id, this.ticketData);
      // this.updateTickets();
    } else {
      console.log(this.ticketData);
      this.ticketService.addTicket(this.ticketData as Omit<Ticket, 'id'>);
      // this.createTickets();
    }
    this.resetForm();
    this.loadTickets();
  }

  editTicket(ticket: Ticket): void {
    this.ticketData = { ...ticket };
    this.isEditMode = true;
  }

  deleteTicket(id: any): void {
    this.ticketService.deleteTicket(id);
    this.loadTickets();
  }

  resetForm(): void {
    this.ticketData = {};
    this.isEditMode = false;
  }
}