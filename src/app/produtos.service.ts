import { Injectable } from '@angular/core';
import { IProduto, produtos } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  //produtos vai receber objeto "IProduto" que tem o vetor de produtos
  produtos: IProduto[] = produtos;

  constructor() { }

  //função que vai pegar todos os produtos desse vetor
  getAll(){
    return this.produtos
  }

  //função que pega um produto espéfico
  getOne(produtoId:number){
    //retorna o produto.id que for igual ao produtoId passado como parâmetro usando a função "find"
    return this.produtos.find(produto => produto.id == produtoId)
  }
}
