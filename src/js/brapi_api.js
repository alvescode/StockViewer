const base_url = "https://brapi.dev/api/"

const brapi = {
    
    TOKEN_PUBLICO : 'qzGeJEP92KTP58tLb4guvN' //TEMP -> Monitorando Acessos

    ,
    
    
    getAvailableStocks : async function (){
        try{
            const response = await fetch(base_url+`available`)
            const responseJSON = await response.json(); //Promise.all()
            const {stocks} = responseJSON
            stocks[9] = "CRIV4"
            stocks[22]="BRGE12"
            stocks[24]="BRIV4"
            return(stocks)
        }
        catch(err){
            return(err)
        }
    }
    
    ,
    
    fetchStockData : async function (ticker){

        try{
            const response = await fetch(base_url+`quote/${ticker}?token=${brapi.TOKEN_PUBLICO}`)
            
            const responseJSON = await response.json()
            const {results} = responseJSON
            
            return results[0]
        }catch(err){
            return(err)
        }        
        
    },
    
    fetchStockListData : async function (tickers_list){
        
        try{
            response_tickers_list = [];
            
            const data_promises_list = tickers_list.map((ticker)=>brapi.fetchStockData(ticker))
            
            const data_list = await Promise.all(data_promises_list)
            return(data_list)
            
        }
        catch(err){
            console.log(err)
        }
        
    }

}