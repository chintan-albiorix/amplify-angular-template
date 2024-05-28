import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'simple-jira', component: TicketManagementComponent},
    {path:'todo', component: TodosComponent},
];
