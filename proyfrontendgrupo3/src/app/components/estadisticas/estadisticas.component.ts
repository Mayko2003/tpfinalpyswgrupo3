import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import Chart from 'chart.js/auto';
import { LoginService } from 'src/app/services/login.service';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';
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
  fechaInicio!: string
  fechaFin!: string
  tipo: string = ""
  tipoChart: string = ""
  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  roles: Array<Rol> = []

  constructor(private anucioService: AnuncioService, private areaService: AreaService, private loginService: LoginService, private router: Router) {
    this.anuncios = new Array<Anuncio>()
    this.areas = new Array<Area>()
    this.datosPieChart1 = []
    this.datosPieChart2 = []
    this.datosBarChart = []
    this.roles = new Array<Rol>()
  }

  ngOnInit(): void {
    //validacion de peticion
    this.cargarMisRoles();
    if (this.roles[0].nombre != "autoridad") {
      this.router.navigate(['/Login'])
    }

    this.areaService.getAreas().subscribe(
      areas => Object.assign(this.areas, areas)
    )
  }

  //metodo para cargar mis roles
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }

  initBarChartDatos(tipo: string) {
    this.datosBarChart = new Array<any>()
    var yearInicio = new Date(this.fechaInicio).getFullYear()
    var yearFin = new Date(this.fechaFin).getFullYear()

    for (let i = yearInicio; i <= yearFin; i++) {
      if (tipo == 'meses') {
        this.meses.forEach(mes => {
          var item = { label: mes + " " + i, value: 0 }
          this.datosBarChart.push(item)
        })
      }
      else {
        var item = { label: i, value: 0 }
        this.datosBarChart.push(item)
      }
    }
  }

  setDatosBarChart(anuncio: Anuncio, index: number = 0) {

    if (this.tipo == 'meses') {

      var mes = anuncio.fechaEntradaVigencia.toLocaleString('es-ES', { month: 'long' })
      //capitalize the mes
      mes = mes.charAt(0).toUpperCase() + mes.slice(1)


      //items para aumentar las barass de acuerdo a la fecha de entrada y salida
      //ya que un anuncio puede estar en 2 anios distintos
      var label1 = mes + " " + anuncio.fechaEntradaVigencia.getFullYear()
      var label2 = mes + " " + anuncio.fechaSalidaVigencia.getFullYear()
      if (label1 == label2) {
        label2 = label2 + " sin efecto"
      }
      for (let i = 0; i < this.datosBarChart.length; i++) {
        if (this.datosBarChart[i].label == label1) {
          this.datosBarChart[i].value = this.datosBarChart[i].value + 1
        }
        if (this.datosBarChart[i].label == label2) {
          this.datosBarChart[i].value = this.datosBarChart[i].value + 1
        }
      }
    }
    else
      this.datosBarChart[index].value += 1
  }

  setDatosPieChart1(anuncio: Anuncio) {
    // generar datos para el grafico 1, segun tipo de anuncio
    var label = anuncio.tipoContenido

    for (let i = 0; i < this.datosPieChart1.length; i++) {
      if (this.datosPieChart1[i].label == label) {
        this.datosPieChart1[i].value += 1
        break
      }
    }
    if (!this.datosPieChart1.some(dato => dato.label == label)) {
      this.datosPieChart1.push({ label: label, value: 1 })
    }
  }

  setDatosPieChart2(anuncio: Anuncio) {
    // generar datos para el grafico 2, segun tipo de rol
    anuncio.destinatarios.forEach(destinatario => {
      var label = destinatario.nombre

      for (let i = 0; i < this.datosPieChart2.length; i++) {
        if (this.datosPieChart2[i].label == label) {
          this.datosPieChart2[i].value += 1
          break
        }
      }
      if (!this.datosPieChart2.some(dato => dato.label == label)) {
        this.datosPieChart2.push({ label: label, value: 1 })
      }
    })
  }

  generarDatos() {
    this.datosPieChart1 = new Array<any>()
    this.datosPieChart2 = new Array<any>()
    var yearInicio = new Date(this.fechaInicio).getFullYear()
    this.anuncios.forEach(anuncio => {
      anuncio.fechaEntradaVigencia = new Date(anuncio.fechaEntradaVigencia)
      anuncio.fechaSalidaVigencia = new Date(anuncio.fechaSalidaVigencia)
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

  filtrar() {
    this.anucioService.getAnunciosFechaRango(this.fechaInicio, this.fechaFin, this.areaSeleccionada).subscribe(
      result => {
        this.anuncios = result
        if (this.anuncios.length == 0) {
          if (this.barChart) this.barChart.destroy()
          if (this.pieChart1) this.pieChart1.destroy()
          if (this.pieChart2) this.pieChart2.destroy()
          return;
        }
        //generar datos
        this.initBarChartDatos(this.tipo) //tipo: meses o años
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