import { Component, HostListener, signal } from '@angular/core';

interface ImagemGaleria {
  src: string;
  alt: string;
  legenda: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly anoAtual = new Date().getFullYear();

  protected readonly numeroWhatsapp = '5571981492623';
  protected readonly telefoneExibicao = '(71) 98149-2623';
  protected readonly instagramUrl = 'https://www.instagram.com/paraisodaspersianas/';

  protected readonly menuAberto = signal(false);
  protected readonly cabecalhoComFundo = signal(false);
  protected readonly indiceImagemAberta = signal<number | null>(null);

  protected readonly galeria: ImagemGaleria[] = [
    {
      src: 'assets/img.webp',
      alt: 'Persiana horizontal instalada em sala de reunião corporativa',
      legenda: 'Persianas horizontais — ambiente corporativo',
    },
    {
      src: 'assets/img2.webp',
      alt: 'Painéis de tecido claro instalados em varanda',
      legenda: 'Painel screen — varanda residencial',
    },
    {
      src: 'assets/img3.jpg',
      alt: 'Cortina de tecido leve em sala de estar',
      legenda: 'Cortina sob medida — sala de estar',
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
