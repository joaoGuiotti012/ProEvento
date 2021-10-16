import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export class Evento {
    /**
     *
     */
    constructor(data?: Partial<Evento>) {
        // Object.assign(this, data);
    }
    
    id!: number;
    local: string = '';
    dataEvento: Date | string = '';
    tema: string  = '';
    qtdPessoas!: number;
    imagemURL: string = '';
    telefone: string = '';
    email: string = '';
    lotes: Lote[] = [];
    redesSociais: RedeSocial[] = [];
    palestrantesEventos: Palestrante[] = [];
}


