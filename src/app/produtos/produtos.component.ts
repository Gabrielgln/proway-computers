import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduto, } from '../produtos';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  //produtos pode ser uma lista de produtos ou indefinido
  produtos: IProduto[] | undefined;

  constructor(
    //criando um obejto com nome produtosService do tipo "ProdutosService"
    private produtosService : ProdutosService,
    private route: ActivatedRoute

  ){}

  ngOnInit(): void{
    //produtos vai receber o objeto produtosService que chama a função que tem no ProdutosService "getAll"
    const produtos = this.produtosService.getAll();
    //tudo que tiver na rota da query que contenha "descricao", guarde na descricao
    this.route.queryParamMap.subscribe(params =>{
      const descricao = params.get("descricao")?.toLowerCase();
      //se tiver descricao
      if(descricao){
        //a lista de produtos vai receber a lista filtrado com apenas produtos que contenham a descricao passada no parâmetro
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        return;
      }
      //caso não tenha recebido nenhuma descricao, a lista de produtos vai receber todos os produtos
      this.produtos = produtos;
    })
  }
}
