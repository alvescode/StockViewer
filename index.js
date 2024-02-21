const elemento_pai_lista = document.getElementById('listaDeAcoes')

const tickers = ['BBDC4','PETR4','TAEE11','SANB11','NEOE3','CMIG4','BBAS3','ROMI3','BMGB4','ITUB4']

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

buscarDados(tickers).then(
    (dados)=>{
        const elementsList = stockModel(dados)
        const view = elementsList.map((acao)=>acao.convertToHTMLCard()).join('');
        elemento_pai_lista.innerHTML = view //concatenar na paginação
    }
).catch((err)=>{console.log(err)})






