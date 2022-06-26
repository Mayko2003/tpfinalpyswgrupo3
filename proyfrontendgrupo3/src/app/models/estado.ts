import { Area } from "./area";

export class Estado {
    _id!: string;
    area!: Area;
    estado!: string //edición, confeccionado, autorizado, noAutorizado, cancelado
}
