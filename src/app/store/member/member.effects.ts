import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MemberService } from '../../services/member.service';
import * as MemberActions from './member.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MemberEffects {
    private actions$ = inject(Actions);
    private memberService = inject(MemberService);

    loadMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMembers),
            mergeMap(() =>
                this.memberService.getAll().pipe(
                    map((members) => MemberActions.loadMembersSuccess({ members })),
                    catchError((error) => of(MemberActions.loadMembersFailure({ error })))
                )
            )
        )
    );

    addMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.addMember),
            mergeMap(({ member }) =>
                this.memberService.create(member).pipe(
                    map((newMember) => MemberActions.addMemberSuccess({ member: newMember })),
                    catchError((error) => of(MemberActions.addMemberFailure({ error }))),
                )
            )
        )
    );

    updateMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.updateMember),
            mergeMap(({ member }) =>
                this.memberService.update(member).pipe(
                    map(updatedMember => MemberActions.updateMemberSuccess({ member: updatedMember })),
                    catchError((error) => of(MemberActions.updateMemberFailure({ error })))
                )
            )
        )
    );

    deleteMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.deleteMember),
            mergeMap(({ id }) =>
                this.memberService.delete(id).pipe(
                    map(() => MemberActions.deleteMemberSuccess({ id })),
                    catchError(error => of(MemberActions.deleteMemberFailure(error)))
                )
            )
        )
    );
}