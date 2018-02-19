import { Routes, RouterModule } from '@angular/router';

// Service
import { RoleGuardService } from '../../shared/index.shared';

// Component
import { CandidateComponent, CandidatesComponent } from '../index.candidate';

const CANDIDATE_ROUTES: Routes = [
    {
        path: 'Candidate',
        component: CandidateComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager', 'VP'] }
    },
    {
        path: 'Candidate/:candidateId',
        component: CandidateComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager', 'VP'] }
    },
    {
        path: 'opening/Candidate/:openingId',
        component: CandidateComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager', 'VP'] }
    },
    {
        path: 'Candidates',
        component: CandidatesComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager', 'VP'] }
    }
];

export const CandidateRouterModule = RouterModule.forRoot(CANDIDATE_ROUTES, { useHash: false });
