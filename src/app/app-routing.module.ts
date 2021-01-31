import {NgModule} from '@angular/core';
import {MainMenuComponent} from './modules/shared/components/main-menu/main-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './modules/shared/components/page-not-found/page-not-found.component';
import {LoginComponent} from './modules/login/components/login/login.component';
import {AuthGuardGuard} from './modules/shared/guards/auth-guard.guard';
import {HomeComponent} from './modules/home/components/home/home.component';
import {EsqueceuSenhaComponent} from './modules/login/components/esqueceu-senha/esqueceu-senha.component';
import {ResetSenhaComponent} from './modules/login/components/reset-senha/reset-senha.component';
import {ConfirmarEmailComponent} from './modules/shared/components/confirmar-email/confirmar-email.component';
import {ProfileComponent} from './modules/profile/components/profile/profile.component';
import {AppointmentsComponent} from './modules/appointments/components/appointments/appointments.component';
import {AccountComponent} from './modules/account/components/account/account.component';
import {RegisterCompanyComponent} from './modules/login/components/register-company/register-company.component';
import {RegisterUserComponent} from './modules/login/components/register-user/register-user.component';
import {HistoricComponent} from './modules/historic/components/historic/historic.component';
import {EmployeeComponent} from './modules/employee/components/employee/employee.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register-user', component: RegisterUserComponent},
    {path: 'register-company', component: RegisterCompanyComponent},
    {path: 'esqueceu-senha', component: EsqueceuSenhaComponent},
    {path: 'confirmar-email/:uid', component: ConfirmarEmailComponent},
    {path: 'redefinir-senha/:uid/:token', component: ResetSenhaComponent},
    {
        path: 'perfil-publico/:uid', component: ProfileComponent, canActivate: [], children: []
    },
    {
        path: 'perfil-privado/:uid', component: MainMenuComponent, canActivate: [], children: [
            {path: '', component: ProfileComponent}
        ]
    },
    {
        path: 'conta', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AccountComponent}
        ]
    },
    {
        path: 'meus-agendamentos', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AppointmentsComponent}
        ]
    },
    {
        path: 'historico', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: HistoricComponent}
        ]
    },
    {
        path: 'funcionarios', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: EmployeeComponent}
        ]
    },
    {path: '**', component: PageNotFoundComponent} // Wildcard route for a 404 page
];


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
