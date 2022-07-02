import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import * as ChartJS from 'chart.js/auto';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  anuncios!: Array<Anuncio>
  areas!: Array<Area>
  datosChart1!: Array<any>
  datosChart2!: Array<any>
  areaSeleccionada: string = "";


  constructor(private anucioService: AnuncioService, private areaService: AreaService) {
    this.anuncios = new Array<Anuncio>()
    this.areas = new Array<Area>()
    this.datosChart1 = []
    this.datosChart2 = []
  }

  ngOnInit(): void {
    this.areaService.getAreas().subscribe(
      areas => Object.assign(this.areas, areas)
    )
  }

  setDatos1(anuncio: Anuncio) {
    // generar datos para el grafico 1, segun tipo de anuncio
    var item = { label: '', value: 0 }
    if (anuncio.tipoContenido == "asd") item = { label: 'Text', value: 1 }
    if (anuncio.tipoContenido == "img") item = { label: 'Imagen', value: 1 }
    if (anuncio.tipoContenido == "video") item = { label: 'Video', value: 1 }
    if (anuncio.tipoContenido == "audio") item = { label: 'Audio', value: 1 }
    if (anuncio.tipoContenido == "pdf") item = { label: 'PDF', value: 1 }

    for (let i = 0; i < this.datosChart1.length; i++) {
      if (this.datosChart1[i].label == item.label) {
        this.datosChart1[i].value += 1
        break
      }
    }
    if (!this.datosChart1.some(dato => dato.label == item.label)) {
      this.datosChart1.push(item)
    }
  }

  setDatos2(anuncio: Anuncio) {
    // generar datos para el grafico 2, segun tipo de rol
    anuncio.destinatarios.forEach(destinatario => {
      var item = { label: destinatario.nombre, value: 1 }

      for (let i = 0; i < this.datosChart2.length; i++) {
        if (this.datosChart2[i].label == item.label) {
          this.datosChart2[i].value += 1
          break
        }
      }
      if (!this.datosChart2.some(dato => dato.label == item.label)) {
        this.datosChart2.push(item)
      }
    })
  }

  generarDatos() {
    this.datosChart1 = new Array<any>()
    this.datosChart2 = new Array<any>()
    this.anuncios.forEach(anuncio => {
      this.setDatos1(anuncio)
      this.setDatos2(anuncio)
    })
  }

  seleccionarArea() {
    this.anucioService.getAnunciosByArea(this.areaSeleccionada).subscribe(
      anuncios => {
        Object.assign(this.anuncios, anuncios)
        this.generarDatos()
      }
    )
  }
}
