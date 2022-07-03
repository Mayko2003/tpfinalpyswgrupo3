import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import Chart from 'chart.js/auto';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  anuncios!: Array<Anuncio>
  areas!: Array<Area>
  datosBarChart!: Array<any>
  datosPieChart1!: Array<any>
  datosPieChart2!: Array<any>
  areaSeleccionada: string = "";
  barChart!: any
  pieChart1!: any
  pieChart2!: any
  fechaInicio!: Date
  fechaFin!: Date
  tipo: string = ""
  tipoChart: string = ""
  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  constructor(private anucioService: AnuncioService, private areaService: AreaService, private loginService: LoginService) {
    this.anuncios = new Array<Anuncio>()
    this.areas = new Array<Area>()
    this.datosPieChart1 = []
    this.datosPieChart2 = []
    this.datosBarChart = []
  }

  ngOnInit(): void {
    this.areaService.getAreas().subscribe(
      areas => Object.assign(this.areas, areas)
    )
  }

  initDatos(tipo:string) {
    this.datosBarChart = new Array<any>()
    var yearInicio = new Date(this.anuncios[0].fechaEntradaVigencia).getFullYear()
    var yearFin = new Date(this.anuncios[this.anuncios.length - 1].fechaEntradaVigencia).getFullYear()
    for (let i = yearInicio; i <= yearFin; i++) {
      if(tipo == 'meses'){
        this.meses.forEach(mes => {
          var item = { label: mes, value: 0 }
          this.datosBarChart.push(item)
        })
      }
      else{
        var item = { label: i, value: 0 }
        this.datosBarChart.push(item)
      } 
    }
  }

  setDatosBarChart(anuncio: Anuncio, index: number = 0) {
    var mes = anuncio.fechaEntradaVigencia.toLocaleString('es-ES', { month: 'long' })
    var item = { label: mes, value: 0 }
    if(this.tipo == 'meses')
      this.datosBarChart[index * 12 + anuncio.fechaEntradaVigencia.getMonth()].value += 1
    else
      this.datosBarChart[index].value += 1
  }

  setDatosPieChart1(anuncio: Anuncio) {
    // generar datos para el grafico 1, segun tipo de anuncio
    var item = { label: '', value: 0 }
    if (anuncio.tipoContenido == "text") item = { label: 'Text', value: 1 }
    if (anuncio.tipoContenido == "img") item = { label: 'Imagen', value: 1 }
    if (anuncio.tipoContenido == "mp4") item = { label: 'Video', value: 1 }
    if (anuncio.tipoContenido == "pdf") item = { label: 'PDF', value: 1 }

    for (let i = 0; i < this.datosPieChart1.length; i++) {
      if (this.datosPieChart1[i].label == item.label) {
        this.datosPieChart1[i].value += 1
        break
      }
    }
    if (!this.datosPieChart1.some(dato => dato.label == item.label)) {
      this.datosPieChart1.push(item)
    }
  }

  setDatosPieChart2(anuncio: Anuncio) {
    // generar datos para el grafico 2, segun tipo de rol
    anuncio.destinatarios.forEach(destinatario => {
      var item = { label: destinatario.nombre, value: 1 }

      for (let i = 0; i < this.datosPieChart2.length; i++) {
        if (this.datosPieChart2[i].label == item.label) {
          this.datosPieChart2[i].value += 1
          break
        }
      }
      if (!this.datosPieChart2.some(dato => dato.label == item.label)) {
        this.datosPieChart2.push(item)
      }
    })
  }

  generarDatos() {
    this.datosPieChart1 = new Array<any>()
    this.datosPieChart2 = new Array<any>()
    var yearInicio = new Date(this.anuncios[0].fechaEntradaVigencia).getFullYear()
    this.anuncios.forEach(anuncio => {
      anuncio.fechaEntradaVigencia = new Date(anuncio.fechaEntradaVigencia)
      this.setDatosBarChart(anuncio, anuncio.fechaEntradaVigencia.getFullYear() - yearInicio)
      this.setDatosPieChart1(anuncio)
      this.setDatosPieChart2(anuncio)
    })
  }

  getRandomRgba() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = Math.random();
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  crearChart(id: string, datos: Array<any>, tipo: any) {
    var barChart = new Chart(id, {
      type: tipo,
      data: {
        labels: datos.map(dato => dato.label),
        datasets: [{
          label: '# de anuncios',
          data: datos.map(dato => dato.value),
          backgroundColor: datos.map(dato => this.getRandomRgba())
        }]
      },
      options: {}
    });
    return barChart
  }

  ordernarAnunciosFecha() {
    //sort by year and month of fechaEntradaVigencia
    this.anuncios.sort((a, b) => {
      //cast to Date each
      var aDate = new Date(a.fechaEntradaVigencia)
      var bDate = new Date(b.fechaEntradaVigencia)
      if (aDate.getFullYear() > bDate.getFullYear()) return 1
      if (aDate.getFullYear() < bDate.getFullYear()) return -1
      if (aDate.getMonth() > bDate.getMonth()) return 1
      if (aDate.getMonth() < bDate.getMonth()) return -1
      return 0
    })
  }

  filtrar() {
    this.anucioService.getAnunciosByArea(this.areaSeleccionada).subscribe(
      result => {
        this.anuncios = result
        if (this.anuncios.length == 0) return;
        this.ordernarAnunciosFecha()
        //generar datos
        this.initDatos(this.tipo)
        this.generarDatos()

        //barchart
        if (this.barChart) this.barChart.destroy()
        this.barChart = this.crearChart('barChart', this.datosBarChart, 'bar')
        //crear torta 1
        if (this.pieChart1) this.pieChart1.destroy()
        this.pieChart1 = this.crearChart('pieChart1', this.datosPieChart1, 'pie')
        //crear grafico torta 2
        if (this.pieChart2) this.pieChart2.destroy()
        this.pieChart2 = this.crearChart('pieChart2', this.datosPieChart2, 'pie')
      }
    )
  }

}
