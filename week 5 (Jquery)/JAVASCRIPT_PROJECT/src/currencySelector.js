import {
    dataFetchApi
} from "./fetchApi";
export const fetchCurrency = (() => {
    const coinListUrl = "https://www.cryptocompare.com/api/data/coinlist/";
    const allCoinValueUrl = "https://min-api.cryptocompare.com/data/pricemulti?";
    const socialStatsUrl = "https://www.cryptocompare.com/api/data/socialstats/?"
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
            let topCurrencyByValue = [];
            let batchedDataValueArray;
            try {
                await fetchCoinList().then((coinData) => {
                    let coinNameArray = [];
                    for (let index in coinData.Data) {
                        coinNameArray.push(coinData.Data[index].Name);
                    }
                    coinList = coinNameArray;
                }).catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
            let bundleDataMap = [];
            await dataFetchApi.fetchBatchData(allCoinValueUrl, coinList).then((data) => batchedDataValueArray = data).catch((e) => console.log(e))
            for (let index = 0; index < batchedDataValueArray.length; index++) {
                let batchedDataSet = batchedDataValueArray[index];
                for (let key in batchedDataSet) {
                    bundleDataMap.push({
                        coin: key,
                        value: batchedDataSet[key]["USD"]
                    })
                }
            }
            let filteredData = bundleDataMap.filter((data) => data.value != undefined);
            filteredData.sort((a, b) => {
                return b.value - a.value
            })
            for (let index = 0; index < 10; index++) {
                topCurrencyByValue.push(filteredData[index]);
            }
            return topCurrencyByValue
        },

        getTop10CurrencyBySocial: async function () {
            let topCurrencyBySocial = [];
            try {

                await fetchCoinList().then((coinData) => {
                    let coinNameArray = [];
                    for (let index in coinData.Data) {
                        coinNameArray.push(coinData.Data[index].Id);
                    }
                    idList = coinNameArray;

                }).catch((e) => console.log(e));

            } catch (e) {
                console.log(e);
            }
            let batchedDataValueArray = [];
            await dataFetchApi.fetchParallelBatchData(socialStatsUrl, idList).then(
                (data) => batchedDataValueArray = data
            ).catch((e) => console.log(e))
            let bundleDataMap = [];
            for (let index = 0; index < batchedDataValueArray.length; index++) {
                bundleDataMap.push({
                    coin: batchedDataValueArray[index].Data.General.Name,
                    likes: batchedDataValueArray[index].Data.Facebook.likes
                });
            }
            let filteredData = bundleDataMap.filter((data) => data.likes != undefined);
            filteredData.sort((a, b) => b.likes - a.likes)
            for (let index = 0; index < 10; index++) {
                topCurrencyBySocial.push(filteredData[index])
            }
            return topCurrencyBySocial;
        }
    }
})();