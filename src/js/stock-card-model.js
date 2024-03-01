class StockCard{
    //Cria o modelo contendo dados ajustados da API e dados relevantes para o site.

    constructor(props){
        const {longName,twoHundredAverageDay,marketCap,regularMarketChangePercent,regularMarketDayLow,regularMarketDayHigh,regularMarketOpen,earningsPerShare,logourl,shortName,regularMarketPrice,symbol} = props;
        this.stock_name_long = longName.replace(/ S\.A\./g,''); //Remove qualquer ocorrência de "S.A." no nome da ação
        this.stock_name_short = shortName;
        this.ticker = symbol;
        this.cotacao = parseFloat(regularMarketPrice).toFixed(2);
        this.variacao = regularMarketChangePercent.toFixed(2);
        this.image = logourl;
        this.acaoSubiu =  this.variacao > 0 ? true : false ;
        this.lpa = earningsPerShare!==null? parseFloat(earningsPerShare).toFixed(2):'';
        this.abertura = regularMarketOpen;
        this.maxima = regularMarketDayHigh;
        this.minima = regularMarketDayLow;
        this.valor_de_mercado = marketCap;
        this.media200d = twoHundredAverageDay;
    } 

    convertToHTMLCard(){

        const color = this.acaoSubiu ? '#3cff3e':'#f14251';
        const flecha = this.acaoSubiu ? 'images/arrow_up.png':'images/arrow_down.png'

        return(
            `
        <li class="stock_card" id="${this.ticker}">
            <div class="header">
                <div>
                    <img class="img" src="${this.image}" alt="${this.stock_name_short}">
                    <p id="nome_da_empresa" style="font-size: .75rem;">${this.stock_name_long}</p>
                </div>
                <div>
                    <div style="display:flex;flex-direction:'row';place-items:'center';">
                        <p id="valor" style="font-size: 1.25rem;color:${color};">R$ ${this.cotacao}</p>
                    </div>
                    <div style="display:flex;flex-direction:'row';place-items:'center';margin:0.5rem;">
                        <img class="arrow_img" src="${flecha}">
                        <p id="valorização_porcentagem" style="font-size:1rem;margin:0rem 0rem 0rem 0.25rem;color:${color};">${this.variacao} %</p>
                    </div>        
                </div>
            </div>
            <div class="details">
                <p id="ticker">${this.ticker}</p>
                <button class="button abrir" style="margin-left:30px;">Ver Mais</button>
            </div>
        </li>
        `
        )
    }
}