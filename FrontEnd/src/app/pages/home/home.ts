import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ImagemGaleria {
  src: string;
  alt: string;
  legenda: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  protected readonly anoAtual = new Date().getFullYear();

  protected readonly numeroWhatsapp = '5571981492623';
  protected readonly telefoneExibicao = '(71) 98149-2623';
  protected readonly instagramUrl = 'https://www.instagram.com/paraisodaspersianas/';

  protected readonly menuAberto = signal(false);
  protected readonly cabecalhoComFundo = signal(false);
  protected readonly indiceImagemAberta = signal<number | null>(null);

  protected readonly galeria: ImagemGaleria[] = [
    {
      src: 'assets/galeria-01.webp',
      alt: 'Cortina de tecido leve cobrindo toda a parede da janela em sala de estar',
      legenda: 'Cortina de tecido leve — sala de estar',
    },
    {
      src: 'assets/galeria-02.webp',
      alt: 'Cortina de caimento amplo em tom azul acinzentado em sala',
      legenda: 'Cortina sob medida — sala',
    },
    {
      src: 'assets/galeria-03.webp',
      alt: 'Painel de tecido na janela de um quarto infantil',
      legenda: 'Painel deslizante — quarto',
    },
    {
      src: 'assets/galeria-04.webp',
      alt: 'Persiana rolô clara na varanda integrada à cozinha',
      legenda: 'Persiana rolô — cozinha e varanda',
    },
    {
      src: 'assets/galeria-05.webp',
      alt: 'Persiana vertical branca instalada em corredor com janelas amplas',
      legenda: 'Persiana vertical — corredor',
    },
    {
      src: 'assets/galeria-06.webp',
      alt: 'Varanda integrada com vista para a cidade e área de jantar',
      legenda: 'Varanda integrada — sala de jantar',
    },
    {
      src: 'assets/galeria-07.webp',
      alt: 'Persiana de faixas alternadas em sala de estar com luz natural',
      legenda: 'Persiana de faixas — sala de estar',
    },
    {
      src: 'assets/galeria-08.webp',
      alt: 'Persiana de faixas alternadas em sala de jantar',
      legenda: 'Persiana de faixas — sala de jantar',
    },
    {
      src: 'assets/galeria-09.webp',
      alt: 'Persiana vertical em tom amadeirado em porta de varanda',
      legenda: 'Persiana vertical — sala de estar',
    },
  ];

  @HostListener('window:scroll')
  protected aoRolarPagina(): void {
    this.cabecalhoComFundo.set(window.scrollY > 12);
  }

  protected alternarMenu(): void {
    this.menuAberto.update((v) => !v);
  }

  protected fecharMenu(): void {
    this.menuAberto.set(false);
  }

  protected abrirImagem(indice: number): void {
    this.indiceImagemAberta.set(indice);
  }

  protected fecharImagem(): void {
    this.indiceImagemAberta.set(null);
  }

  protected imagemAnterior(evento: Event): void {
    evento.stopPropagation();
    const atual = this.indiceImagemAberta();
    if (atual === null) return;
    const total = this.galeria.length;
    this.indiceImagemAberta.set((atual - 1 + total) % total);
  }

  protected proximaImagem(evento: Event): void {
    evento.stopPropagation();
    const atual = this.indiceImagemAberta();
    if (atual === null) return;
    const total = this.galeria.length;
    this.indiceImagemAberta.set((atual + 1) % total);
  }
}
