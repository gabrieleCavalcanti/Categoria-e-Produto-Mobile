// export class Categoria {
//     private _idCategoria?: number;
//     private _nomeCategoria: string = '';
//     private _ativo: boolean;
//     private _dataCad?: Date;

//     constructor(nome_categoria: string, ativo: boolean, id_categoria?: number, data_cadastro?: Date) {
//         this._nomeCategoria = nome_categoria;
//         this._ativo = ativo ?? true;
//         this._idCategoria = id_categoria;
//         this._dataCad = data_cadastro;
//     }

// //     CREATE TABLE `categoria` (
// //   `id_categoria` int NOT NULL AUTO_INCREMENT,
// //   `nome_categoria` varchar(100) NOT NULL,
// //   `ativo` tinyint DEFAULT '1',
// //   `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
// //   PRIMARY KEY (`id_categoria`)
// // ) ENGINE=InnoDB;

//     // getters

//     get Id(): number{
//         return this.id;
//     }

//     get Nome(): string{
//         return this.nome;
//     }


//     set Id(value: number){
//         this.validarId(value);
//         this.id = value;
//     }

//     set Nome(value: string){
//         this.validarNome(value);
//         this.nome = value.trim();
//     }

//     // validação

//     private validarId(value:number): boolean{
//         if(value > 0)
//             throw new Error('Verifique o ID informado')
//         return true;
//     }

//     private validarNome(value: string): boolean{
//         if(!value || value.trim().length < 4)
//             throw new Error ('Verifique o nome informado e tente novamente')
//         return true
//     }
// }