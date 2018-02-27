import {
    dataFetchApi
} from "./fetchApi";
export const fetchCurrency = (() => {
    const coinListUrl = "https://www.cryptocompare.com/api/data/coinlist/";
    const allCoinValueUrl = "https://min-api.cryptocompare.com/data/pricemulti?";
    const socialStatsUrl= "https://www.cryptocompare.com/api/data/socialstats/?"
    let coinList = [];
    let idList = [];
    async function fetchCoinList() {
        let fetchedJson;
        try {
            await dataFetchApi.fetchData(coinListUrl).then((data) => fetchedJson = data).catch((e) => console.log(e));
        } catch (e) {
            console.log(e);
        }
        return fetchedJson;
    }
    return {
        getTop10CurrencyByValue: async function () {
            console.log("IN GET TOP 10 CURRENCY BY VALUE");
            let topCurrencyByValue = [];
            let batchedDataValueArray;
            try {
                await fetchCoinList().then((coinData) => {
                    let coinNameArray = [];
                    for (let index in coinData.Data) {
                        coinNameArray.push(coinData.Data[index].Name);
                    }
                    coinList = coinNameArray;
                    console.log("COIN NAME LIST SET");

                }).catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
            let bundleDataMap = [];
            await dataFetchApi.fetchBatchData(allCoinValueUrl, coinList).then((data) => batchedDataValueArray = data).catch((e) => console.log(e))
            console.log(batchedDataValueArray);
            for (let index = 0; index < batchedDataValueArray.length; index++) {
                let batchedDataSet = batchedDataValueArray[index];
                for (let key in batchedDataSet) {
                    bundleDataMap.push({
                        coin: key,
                        value: batchedDataSet[key]["USD"]
                    })
                }
            }
            console.log(bundleDataMap);
            let filteredData = bundleDataMap.filter((data)=>data.value!=undefined);
            filteredData.sort((a, b) => {
                return b.value - a.value
            })
            console.log(bundleDataMap);
            
            console.log(filteredData);
            for (let index = 0; index < 10; index++) {
                topCurrencyByValue.push(filteredData[index]);
            }
            console.log("------------------------------------------------------------------");
            
            console.log(topCurrencyByValue);
            return topCurrencyByValue
        },

        getTop10CurrencyBySocial: async function () {
            console.log("IN GET TOP 10 CURRENCY BY SOCIAL MEDIA");
            let topCurrencyBySocial = [];
            try {

                await fetchCoinList().then((coinData) => {
                    let coinNameArray = [];
                    for (let index in coinData.Data) {
                        coinNameArray.push(coinData.Data[index].Id);
                    }
                    idList = coinNameArray;
                    console.log("COIN NAME LIST SET");

                }).catch((e) => console.log(e));

            } catch (e) {
                console.log(e);
            }
            console.log(idList)
            let batchedDataValueArray=[];
            await dataFetchApi.fetchParallelBatchData(socialStatsUrl,idList).then(
                (data)=>batchedDataValueArray=data
            ).catch((e)=>console.log(e))
            console.log(batchedDataValueArray);
            let bundleDataMap=[];
            for (let index = 0; index < batchedDataValueArray.length; index++) {
                console.log(batchedDataValueArray.Response);
                
                console.log(batchedDataValueArray[index].Data.General.Name + " : " + batchedDataValueArray[index].Data.Facebook.likes);
                bundleDataMap.push({
                    coin : batchedDataValueArray[index].Data.General.Name,
                    likes: batchedDataValueArray[index].Data.Facebook.likes
                });
                
            }
            let filteredData=bundleDataMap.filter((data)=>data.likes!=undefined);
            console.log(filteredData);
            filteredData.sort((a,b)=>b.likes-a.likes)            
            for (let index = 0; index < 10; index++) {
                topCurrencyBySocial.push(filteredData[index])  
            }
            console.log(topCurrencyBySocial);
            return topCurrencyBySocial;
        }
    }
})();
