import { Component } from '@angular/core';
import { ANIMALES } from '../data/data.animales';
import { Animal } from '../interfaces/animales.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  aundioTiempo: any;
  ordenando: Boolean = true;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal) {
    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.aundioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausarAudio(animalSeleccionado: Animal) {
    clearTimeout(this.aundioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if (animal.nombre !== animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(idx: number) {
    this.animales.splice(idx, 1);
  }

  recargarAnimales(refresh: any) {
    setTimeout(() => {
      console.log('Termino el refresh');
      this.animales = ANIMALES;
      refresh.target.complete();
    }, 2000);
  }

  reorder(event) {
    const item = this.animales.splice(event.detail.from, 1)[0];
    this.animales.splice(event.detail.to, 0, item);
    event.detail.complete();
  }

}
