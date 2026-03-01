// store/member.actions.ts
import { createAction, props } from '@ngrx/store';
import { Member } from '../../models/member.model';

export const loadMembers = createAction('[Member] Load Members');
export const loadMembersSuccess = createAction('[Member] Load Members Success', props<{ members: Member[] }>());
export const loadMembersFailure = createAction('[Member] Load Members Failure', props<{ error: any }>());

export const addMember = createAction('[Member] Add Member', props<{ member: Member }>());
export const addMemberSuccess = createAction('[Member] Add Member Success', props<{ member: Member }>());
export const addMemberFailure = createAction('[Member] Add Member Failure', props<{ error: any }>());