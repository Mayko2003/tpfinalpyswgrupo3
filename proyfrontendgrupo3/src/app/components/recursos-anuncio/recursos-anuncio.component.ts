import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-recursos-anuncio',
  templateUrl: './recursos-anuncio.component.html',
  styleUrls: ['./recursos-anuncio.component.css']
})
export class RecursosAnuncioComponent implements OnInit {

  anuncio!: Anuncio
  constructor(private route: ActivatedRoute,private anuncioService: AnuncioService, private sanitizer: DomSanitizer) { 
    this.anuncio = new Anuncio()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.anuncioService.getAnuncio(id).subscribe(res => {
          Object.assign(this.anuncio, res)
        })
      }
    })
  }

  sanitizar(recurso:string):SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(recurso)
  }


}
