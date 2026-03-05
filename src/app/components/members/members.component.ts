import { Component, signal } from '@angular/core';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
import { Member } from '../../models/member.model';
import { Store } from '@ngrx/store';
import * as MemberActions from '../../store/member/member.actions';
import { selectAllMembers } from '../../store/member/member.selectors';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  imports: [MemberFormComponent, CommonModule, FormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

  showForm = signal(false);
  members = signal<Member[]>([]);

  constructor(private store: Store, private router: Router) {
    this.store.select(selectAllMembers).subscribe(data => this.members.set(data));
    this.loadMembers();
  }

  loadMembers() {
    this.store.dispatch(MemberActions.loadMembers());
  }


  show() {
    this.showForm.set(!this.showForm());
    console.log('showform : ', this.showForm());
  }

  goToDetails(id: number | undefined) {
    this.router.navigate(['/member', id]);
  }

  closeForm() {
    this.showForm.set(false);
  }

}
