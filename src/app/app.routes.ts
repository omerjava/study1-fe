import { Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'books', component: BookComponent },
    { path: 'members', component: MembersComponent },
    {
        path: 'member/:id', component: MemberDetailComponent
    },
    { path: '**', redirectTo: '' }
];
