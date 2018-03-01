export const calculateCurrency = (() => {
    return {
        calculateExchangeValue: async function () {
            let exchangeRate;
            await $.getJSON("https://min-api.cryptocompare.com/data/price", {
                fsym: $("#fromCurrency option:selected").val(),
                tsyms: $("#toCurrency option:selected").val()
            },(data)=>{
                exchangeRate=data
            })
            $("#toVal").val(Number($("#fromVal").val())*Number(exchangeRate[Object.keys(exchangeRate)[0]]))            
        }
    }
})();