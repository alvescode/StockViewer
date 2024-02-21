
const brapi = {

    TOKEN_PUBLICO : 'qzGeJEP92KTP58tLb4guvN' //TEMP -> Monitorando Acessos

    ,

    fetchStockData : async function (ticker){

        try{
            const response = await fetch(`https://brapi.dev/api/quote/${ticker}?token=${brapi.TOKEN_PUBLICO}`)
            
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
