import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

import {SessionService} from '../../../shared/services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';

import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';
import {Roles} from '../../../shared/enums/roles.enum';
import {User} from '../../../shared/models/user.class';
import {Authentication, UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {ResponseBase} from '../../../shared/models/response-base.class';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public roles = Roles;
    public user: User;
    public formLogin: FormGroup;
    public eyeHide = true;

    public userLogged: boolean;
    private userAuthenticated: UserAuthenticated;
    private userEmail: string = null;

    private uid: string = null;
    private role: string = null;

    constructor(private authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private dialog: MatDialog,
                private title: Title,
                private router: Router,
                private route: ActivatedRoute,
                private notificationService: NotificationService,
                private deviceService: DeviceService) {
    }


    ngOnInit(): void {
        this.userAuthenticated = this.sessionService.userAuthenticated;
        this.userLogged = this.sessionService.isAuthenticated;
        this.uid = this.route.snapshot.queryParamMap.get('uid');
        this.role = this.route.snapshot.queryParamMap.get('role');
        if (this.userAuthenticated) {
            this.router.navigate(['perfil']);
            this.setRouteToRoles(this.userAuthenticated.role, {uid: this.uid, role: this.role});
        } else {
            this.title.setTitle('Login | Me Agenda Aí');
            this.userEmail = this.route.snapshot.queryParamMap.get('email');
            this.formLogin = this.createForm(new Authentication());
        }
    }

    // retorna todos os controls do form
    get form(): { [control: string]: AbstractControl } {
        return this.formLogin.controls;
    }

    private createForm(authentication: Authentication): FormGroup {
        return this.fb.group({
            email: new FormControl(authentication.email = this.userEmail ? this.userEmail : '', [Validators.required, Validators.email]),
            senha: new FormControl(authentication.password, [Validators.required])
        });
    }

    public esqueceuSenha(): void {
        this.router.navigate(['esqueceu-senha']);
    }

    public onSubmit(authentication: Authentication): void {
        if (this.formLogin.valid) {
            this.authenticationService.login(authentication).subscribe((response: ResponseBase<UserAuthenticated>) => {
                if (response.success) {
                    this.userAuthenticated = response.result;
                    console.log(this.userAuthenticated.message);

                    this.sessionService.authenticated(this.userAuthenticated.authenticated);
                    this.sessionService.setUser(this.userAuthenticated);
                    this.sessionService.setRefreshToken(this.userAuthenticated.refreshToken);
                    this.sessionService.setToken(this.userAuthenticated.token);

                    if (this.uid && this.role) {
                        this.setRouteToRoles(this.userAuthenticated.role, {uid: this.uid, role: this.role});
                    } else {
                        this.setRouteToRoles(this.userAuthenticated.role);
                    }

                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message);
                }
            }, e => {
                console.log(e.error.result);
                console.log(this.deviceService.deviceInfo);
                console.log(this.deviceService.type);
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.result) :
                    this.notificationService.showMessageSnackBar(e.error.result, true);
            });
        } else {
            GenericValidator.verifierValidatorsForm(this.formLogin);
        }
    }

    public goToRegister(role: Roles): void {
        switch (role) {
            case Roles.Cliente:
                this.router.navigate(['register-user']);
                break;
            case Roles.UsuarioEmpresa:
                this.router.navigate(['register-company']);
                break;
            default:
                break;
        }
    }

    public goToHome(): void {
        this.router.navigate(['']);
    }

    private setRouteToRoles(role: Roles, navigate: { uid: string; role: string } = null): void {
        switch (role) {
            case Roles.Cliente:
                this.alternativeRouter(navigate);
                break;
            case Roles.UsuarioEmpresa:
                this.router.navigate([`perfil/${this.userAuthenticated.secondaryId}/${this.userAuthenticated.role}`]);
                break;
            case Roles.Funcionario:
                this.router.navigate([`perfil/${this.userAuthenticated.secondaryId}/${this.userAuthenticated.role}`]);
                break;
            default:
                break;
        }
    }

    private alternativeRouter(navigate: { uid: string; role: string } = null): void {
        if (navigate !== null) {
            this.router.navigate([`perfil/${navigate.uid}/${navigate.role}`]);
        } else {
            this.router.navigate(['meus-agendamentos']);
        }

    }
}
