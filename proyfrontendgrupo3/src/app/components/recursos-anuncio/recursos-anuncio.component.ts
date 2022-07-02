import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-recursos-anuncio',
  templateUrl: './recursos-anuncio.component.html',
  styleUrls: ['./recursos-anuncio.component.css']
})
export class RecursosAnuncioComponent implements OnInit {

  anuncio!: Anuncio
  constructor(private route: ActivatedRoute,private anuncioService: AnuncioService) { 
    this.anuncio = new Anuncio()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.anuncioService.getAnuncio(id).subscribe(res => {
          this.anuncio = res
        })
      }
    })
  }



}
