const elemento_pai_lista = document.getElementById('listaDeAcoes')
const more_btn = document.getElementById('btn_load_more')

const returnAvailableStocks= async ()=>{
    const tickers = await brapi.getAvailableStocks()
    return(tickers)
}

const buscarDados = async (lista) => {
    try{
        const dadosDaAcao = await brapi.fetchStockListData(lista)
        return dadosDaAcao
    }catch(err){
        return(err)
    }
}

const stockModel = function (dados=[]){
    
    const newList = dados.map((acao)=>new StockCard(acao))
    
    return newList;
}

async function main(inicio=0,fim=7){
    try{
        const tickers = await returnAvailableStocks()
        const slice_tickers = tickers.slice(inicio,fim)
        buscarDados(slice_tickers).then((dados)=>{
            const htmlElementsList = stockModel(dados).map((acao)=>acao.convertToHTMLCard())
            elemento_pai_lista.innerHTML += htmlElementsList.join('');
        })
    }
    catch(err){
        console.log(err);
    }
}

main();

let inicio_lista_acoes = 0
let tamanho_da_lista_de_acoes = 7
let fim_lista_acoes = tamanho_da_lista_de_acoes


// Mecanismo de Paginação:
more_btn.addEventListener('click',()=>{
    inicio_lista_acoes += tamanho_da_lista_de_acoes
    fim_lista_acoes += tamanho_da_lista_de_acoes
    main(inicio_lista_acoes,fim_lista_acoes);
})