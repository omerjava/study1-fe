// store/member.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MemberState } from './member.reducer';

export const selectMemberState = createFeatureSelector<MemberState>('members');

export const selectAllMembers = createSelector(
    selectMemberState,
    (state) => state.members
);

export const selectLoading = createSelector(
    selectMemberState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectMemberState,
    (state) => state.error
);