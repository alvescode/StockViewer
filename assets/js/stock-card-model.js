class StockCard{
    //Cria o modelo contendo dados ajustados da API e dados relevantes para o site.

    constructor(props){
        const {longName,regularMarketChangePercent,regularMarketDayLow,regularMarketDayHigh,regularMarketOpen,earningsPerShare,logourl,shortName,regularMarketPrice,symbol} = props;
         this.stock_name_long = longName.replace(/ S\.A\./g,'');
         this.stock_name_short = shortName;
         this.ticker = symbol;
         this.price = regularMarketPrice;
         this.variacao = regularMarketChangePercent.toFixed(2);
         this.image = logourl;
         this.acaoSubiu =  this.variacao > 0 ? true : false ;
        //  this.lpa = earningsPerShare.toFixed(2); //retorna uma str e as vezes retorna null
        //as vezes o lpa vem null da api, tratar.
         this.abertura = regularMarketOpen;
         this.maxima = regularMarketDayHigh;
         this.minima = regularMarketDayLow;
    } 

    convertToHTMLCard(){

        const color = this.acaoSubiu ? '#3cff3e':'#f14251';
        const flecha = this.acaoSubiu ? '../images/arrow_up.png':'../images/arrow_down.png'
        return(
            `
        <li class="stock_card">
            <div class="header">
                <div>
                    <img class="img" src="${this.image}" alt="${this.stock_name_short}">
                    <p id="nome_da_empresa" style="font-size: .75rem;">${this.stock_name_long}</p>
                </div>
                <div>
                    <div style="display:flex;flex-direction:'row';place-items:'center';">
                        <p id="valor" style="font-size: 1.25rem;color:${color};">R$ ${this.price}</p>
                    </div>
                    <div style="display:flex;flex-direction:'row';place-items:'center';margin:0.5rem;">
                        <img class="arrow_img" src="${flecha}">
                        <p id="valorização_porcentagem" style="font-size:1rem;margin:0rem 0rem 0rem 0.25rem;color:${color};">${this.variacao} %</p>
                    </div>        
                </div>
            </div>
            <div class="details">
                <p id="ticker">${this.ticker}</p>
            </div>
        </li>
        `
        )
    }


}