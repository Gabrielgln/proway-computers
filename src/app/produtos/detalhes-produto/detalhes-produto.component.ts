import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificaoService } from 'src/app/notificao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: IProduto | undefined;
  quantidade = 1;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificaoService,
    private carrinhoService: CarrinhoService
  ){}

  ngOnInit(): void {
    //routeParams vai receber todos os parametros desse produto, tipo "nome id etc...""
    const routeParams = this.route.snapshot.paramMap;
    /*produtoId vai receber routeParams usando a função get passando o "id",
     que tambem ta no path da produtos-routing que vai ser convertido para Number*/
    const produtoId = Number(routeParams.get("id"));
    //produto vai receber o objeto produtosService que tem a função getOne passando o produtoId
    this.produto = this.produtosService.getOne(produtoId);
  }

  adicionarAoCarrinho(){
    this.notificacaoService.notificar("O produto foi adicionado ao carrinho!")
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade

    }
    this.carrinhoService.adicionarAoCarrinho(produto);
  }
}
