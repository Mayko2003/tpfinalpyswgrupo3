import { AreaRol } from "./area-rol"
import { Estado } from "./estado"
import { Persona } from "./persona"
import { Recurso } from "./recurso"


export class Anuncio {
    _id!: string
    titulo!: string
    contenido!: string // imagen, video, html, pdf 
    tipoContenido!: string 
    fechaEntradaVigencia!: Date
    fechaSalidaVigencia!: Date
    tiempoLectura!: string // corto, medio, largo 
    estados!: Array<Estado>; 
    destinatarios!: Array<AreaRol>; //permite profundidad entre areas
    recursos!: Array<Recurso>; // imagenes, videos, htmls, pdfs
    mediosTransmision!: Array<string>;
    codigoQR!: string
    redactor!: Persona

}
