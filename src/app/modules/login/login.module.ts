import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EsqueceuSenhaComponent} from './components/esqueceu-senha/esqueceu-senha.component';
import {MatCardModule} from '@angular/material/card';
import {CadastroComponent} from './components/cadastro/cadastro.component';

@NgModule({
    declarations: [LoginComponent, EsqueceuSenhaComponent, CadastroComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule

    ]
})
export class LoginModule {
}
