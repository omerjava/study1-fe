import { createReducer, on } from '@ngrx/store';
import * as MemberActions from './member.actions';
import { Member } from '../../models/member.model';

export interface MemberState {
    members: Member[];
    loading: boolean;
    error: any;
}

export const initialState: MemberState = {
    members: [],
    loading: false,
    error: null,
};

export const memberReducer = createReducer(
    initialState,
    on(MemberActions.loadMembers, (state) => ({ ...state, loading: true })),
    on(MemberActions.loadMembersSuccess, (state, { members }) => ({
        ...state,
        loading: false,
        members,
    })),
    on(MemberActions.loadMembersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(MemberActions.addMember, (state) => ({ ...state, loading: true })),
    on(MemberActions.addMemberSuccess, (state, { member }) => ({
        ...state,
        loading: false,
        members: [...state.members, member],
    })),
    on(MemberActions.addMemberFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);