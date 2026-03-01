import { Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'book', component: BookComponent },
    { path: 'member', component: MemberFormComponent },
    { path: '**', redirectTo: '' }
];
