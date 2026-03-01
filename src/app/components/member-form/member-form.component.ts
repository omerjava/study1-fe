import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { MemberState } from '../../store/member/member.reducer';
import { Store } from '@ngrx/store';
import * as MemberActions from '../../store/member/member.actions';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';


@Component({
  selector: 'app-member-form',
  imports: [ReactiveFormsModule, CommonModule, MenuBarComponent],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css'
})
export class MemberFormComponent {

  memberForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    gsm: new FormControl('', { nonNullable: true, validators: Validators.required }),
    address: new FormControl('', { nonNullable: true }),
    postcode: new FormControl(0, { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    state: new FormControl(''),
    country: new FormControl('', { nonNullable: true }),
    membershipStartDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    membershipExpiryDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    profilePhotoUrl: new FormControl(''),
    subscriptionFeePaid: new FormControl(false, { nonNullable: true }),
  });

  submitted = false;

  constructor(private store: Store<MemberState>) { }

  get f() {
    return this.memberForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) return;

    // safely extract typed values
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

    // ✅ Dispatch NgRx action directly
    this.store.dispatch(MemberActions.addMember({ member }));

    this.memberForm.reset();
    this.submitted = false;
  }

}
