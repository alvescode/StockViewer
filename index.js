const elemento_pai_lista = document.getElementById('listaDeAcoes')
const more_btn = document.getElementById('btn_load_more')

const buscarDados = async (lista) => {
    try{
        const dadosDaAcao = await brapi.fetchStockListData(lista)
        console.log(dadosDaAcao)
        return dadosDaAcao
    }catch(err){
        return(err)
    }
}

const stockModel = function (dados=[]){
    
    const newList = dados.map((acao)=>new StockCard(acao))
    
    return newList;
}

let inicio_lista_acoes = 0
let tamanho_da_lista_de_acoes = 6
let fim_lista_acoes = tamanho_da_lista_de_acoes
let acoes_disponiveis; 

async function main({inicio=0,fim=tamanho_da_lista_de_acoes,tickers=acoes_disponiveis}){
    try{
        console.log(inicio,fim)
        const slice_tickers = tickers.slice(inicio,fim)
        console.log(slice_tickers)
        buscarDados(slice_tickers).then((dados)=>{
            const htmlElementsList = stockModel(dados).map((acao)=>acao.convertToHTMLCard())
            elemento_pai_lista.innerHTML += htmlElementsList.join('');
        }) 
    }
    catch(err){
        console.log(err);
    }
}
brapi.getAvailableStocks().then((tickers_list)=>{ //Chama a função main() apenas com os tickers disponíveis na API
    acoes_disponiveis = tickers_list;
    main({});
})

// Mecanismo de Paginação:
more_btn.addEventListener('click',()=>{
    inicio_lista_acoes += tamanho_da_lista_de_acoes
    fim_lista_acoes += tamanho_da_lista_de_acoes
    main({inicio:inicio_lista_acoes,fim:fim_lista_acoes,tickers:acoes_disponiveis});
})