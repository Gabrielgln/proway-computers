import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ){}

  //toda vez que utilizamos o carrinho essas funçãos são inicializadas automaticamente
  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }
  //remoção para limpar da tela assim que clicar e chama a função de remoção do carrinho service
  removerProdutoCarrinho(produtoId:number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    //APOS A REMOÇÃO, CALCULE NOVAMENTE O VALOR TOTAL
    this.calcularTotal();
  }

  calcularTotal(){
    //o total vai receber o vetor de carrinho percorrendo cada elemento com o "reduce", pegando o vai anterior e o atual com o "prev" e "curr" respectivamente, calculando o preço do atual e a quantidade e assim que somado ele vira o "prev" = anterior e retornando um valor nulo que seria 0
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade),0)
  }

  comprar(){
    alert("Parabéns, você finalizou a sua compra!");
    //limpando o carrinho após a compra
    this.carrinhoService.limparCarrinho();
    //usando o router para assim que comprar, ser redirecionado para tela de produtos
    this.router.navigate(["produtos"]);
  }

}
