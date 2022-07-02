import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursos-anuncio',
  templateUrl: './recursos-anuncio.component.html',
  styleUrls: ['./recursos-anuncio.component.css']
})
export class RecursosAnuncioComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        var a = params['id'];
        console.log(a);
      }
    })
  }

}
