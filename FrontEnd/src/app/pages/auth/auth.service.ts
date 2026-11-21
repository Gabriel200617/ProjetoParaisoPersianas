import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { resolve } from 'path';

export interface Usuario{
    nome: String;
    email: String;
}

export interface DadosLogin{
    email: String;
    senha: String;
}

const CHAVE_SESSAO = 'paraiso.sessao';

@Injectable({providedIn: 'root'})
export class AuthService{
    
    private readonly ehNavegador = isPlatformBrowser(inject(PLATFORM_ID));

    private readonly _usuario = signal<Usuario | null>(this.lerSessao());
    readonly usuario = this._usuario.asReadonly();
    readonly logado = computed(() => this._usuario() !== null);


    async entrar(dados: DadosLogin): Promise<void> {
        await this.simularRede();
        this.iniciarSessao({ nome: dados.email.split('@')[0], email: dados.email});
    }

    sair(): void{
        this._usuario.set(null);
        if(this.ehNavegador) localStorage.removeItem(CHAVE_SESSAO);
    }

    private iniciarSessao(usuario: Usuario): void {
        this._usuario.set(usuario);
        if(this.ehNavegador) localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    }

    private lerSessao(): Usuario | null {
    if (!this.ehNavegador) return null;
    try {
      const bruto = localStorage.getItem(CHAVE_SESSAO);
      return bruto ? (JSON.parse(bruto) as Usuario) : null;
    } catch {
      return null;
    }
  }
 
  private simularRede(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 900));
  }

}