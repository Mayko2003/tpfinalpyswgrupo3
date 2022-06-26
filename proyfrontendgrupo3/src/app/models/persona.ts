import { Area } from "./area";
import { Rol } from "./rol";

export class Persona {
    _id!: string;
    apellido!: string
    nombre!: string
    legajo!: number
    dni!: number
    email!: string
    roles!: Array<Rol>   //una persona puede tener varios roles
    area!: Area   //una persona solo puede trabajar en un area
    nombreUsuario!: string
    contrasenia!: string
    estado!: boolean
}
