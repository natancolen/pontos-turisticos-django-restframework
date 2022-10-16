import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public invalidField = 'Campo inválido!';

  public clientForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  registrar() {
    if (!this.clientForm) {
      alert(this.invalidField);
      return;
    }

    this.limparDados();

    this.router.navigate(['home']);
  }

  limparDados() {
    this.clientForm.clearValidators();
  }
}
