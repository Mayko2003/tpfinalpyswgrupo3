import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursos-anuncio',
  templateUrl: './recursos-anuncio.component.html',
  styleUrls: ['./recursos-anuncio.component.css']
})
export class RecursosAnuncioComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
     console.log(params)
      })
  }

}
