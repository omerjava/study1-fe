import { Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { VideoComponent } from './components/video/video.component';
import { TemplateFormsComponent } from './components/template-forms/template-forms.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'books', component: BookComponent },
    { path: 'members', component: MembersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'member/:id', component: MemberDetailComponent },
    { path: 'video', component: VideoComponent },
    { path: 'template', component: TemplateFormsComponent },
    { path: 'reactive', component: ReactiveFormsComponent },
    { path: '**', redirectTo: '' }
];
