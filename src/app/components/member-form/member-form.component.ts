import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { MemberState } from '../../store/member/member.reducer';
import { Store } from '@ngrx/store';
import * as MemberActions from '../../store/member/member.actions';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';


@Component({
  selector: 'app-member-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css'
})
export class MemberFormComponent {
  @Input() selectedMember: Member | null = null;
  @Output() closeForm = new EventEmitter<boolean>();

  memberForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    gsm: new FormControl('', { nonNullable: true, validators: Validators.required }),
    address: new FormControl('', { nonNullable: true, validators: Validators.required }),
    postcode: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    city: new FormControl('', { nonNullable: true, validators: Validators.required }),
    state: new FormControl(''),
    country: new FormControl('', { nonNullable: true, validators: Validators.required }),
    membershipStartDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    membershipExpiryDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    profilePhotoUrl: new FormControl(''),
    subscriptionFeePaid: new FormControl(false, { nonNullable: true }),
  })

  submitted = false;

  constructor(private store: Store<MemberState>) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['selectedMember'] && this.selectedMember) {

      this.memberForm.patchValue({
        name: this.selectedMember.name,
        gsm: this.selectedMember.gsm,
        address: this.selectedMember.address,
        postcode: this.selectedMember.postcode,
        city: this.selectedMember.city,
        state: this.selectedMember.state,
        country: this.selectedMember.country,
        membershipStartDate: this.selectedMember.membershipStartDate,
        membershipExpiryDate: this.selectedMember.membershipExpiryDate,
        profilePhotoUrl: this.selectedMember.profilePhotoUrl,
        subscriptionFeePaid: this.selectedMember.subscriptionFeePaid
      });

    }
  }

  get f() {
    return this.memberForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) return;

    const formValue = this.memberForm.value;

    const member: Member = {
      name: formValue.name!,
      gsm: formValue.gsm!,
      address: formValue.address ?? '',
      postcode: formValue.postcode ?? 0, // fallback 0 if null
      city: formValue.city ?? '',
      state: formValue.state ?? '',
      country: formValue.country ?? '',
      membershipStartDate: formValue.membershipStartDate!,
      membershipExpiryDate: formValue.membershipExpiryDate!,
      profilePhotoUrl: formValue.profilePhotoUrl ?? '',
      subscriptionFeePaid: formValue.subscriptionFeePaid ?? false,
    };

    const memberToEdit: Member = {
      ...member,
      id: this.selectedMember?.id
    } as Member;

    if (this.selectedMember) {
      this.store.dispatch(MemberActions.updateMember({ member: memberToEdit }));
    } else {
      this.store.dispatch(MemberActions.addMember({ member }));
    }

    this.memberForm.reset();
    this.submitted = false;
    this.closeForm.emit();
  }

}
