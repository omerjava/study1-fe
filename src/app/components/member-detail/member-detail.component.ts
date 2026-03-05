import { Component, signal } from '@angular/core';
import { Member } from '../../models/member.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectMemberById } from '../../store/member/member.selectors';
import { CommonModule } from '@angular/common';
import * as MemberActions from '../../store/member/member.actions';
import { MemberFormComponent } from '../member-form/member-form.component';


@Component({
  selector: 'app-member-detail',
  imports: [CommonModule, MemberFormComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent {
  member = signal<Member | null>(null);
  isEditable = signal(false);
  selectedMember: Member | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.select(selectMemberById(id)).subscribe(m => this.member.set(m || null));
  }

  selectMember(member: Member) {
    this.isEditable.set(!this.isEditable());
    this.selectedMember = { ...member };
  }

  deleteMember(id: number | undefined) {
    if (id) {
      this.store.dispatch(MemberActions.deleteMember({ id }));
    }
  }

  closeForm() {
    this.isEditable.set(false);
  }

}
