import { Injectable } from '@angular/core';
import { IProduto, IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obtemCarrinho(){
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho){
    //o vetor de itens vai receber o produto e adicionar na lista dos itens
    this.itens.push(produto);
    //adicionando os itens no localStorage que estão na rota "carrinho" e passando um json em formato de string com o vetor de this.itens que contem todos os produtos
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  removerProdutoCarrinho(produtoId:number){
    //o vetor de itens vai receber os itens que contém o id diferente do que foi passado como parametro
    //para não incluir esse id que no caso vai ser apagado
    this.itens = this.itens.filter(item => item.id !== produtoId);
    //sobre escrevendo o carrinho do localStorage com o vetor sem o produto com o id passado
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho(){
    this.itens = [];
    localStorage.clear();
  }
}
