export const coinSettings = (()=>{
    let coinlist=[];
    
    let fetchCoinList = () => {
        let coinData;
        await $.getJSON("https://www.cryptocompare.com/api/data/coinlist/",(data)=>{
            coinData=data;
        })
    }


    let setToValue = ()=>{
        
    }
    let setFromValue = ()=>{

    }
    return {
        setCalculator : ()=>{

        }
    }
})();