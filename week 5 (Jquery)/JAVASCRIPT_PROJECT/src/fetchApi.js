import {
    generateBatches,
    generateUrlParams
} from "./utilityApi";

export const dataFetchApi = (() => {

    let mutiCoinValueParam = {
        fsyms: "BTC",
        tsyms: "USD"
    }

    let idParam = {
        Id: "1"
    }

    const getMultiCoinValueParam = function () {
        return mutiCoinValueParam;
    }

    const setMultiCoinValueParam = function (fsyms) {
        mutiCoinValueParam.fsyms = fsyms;
    }

    const getIdParam = function () {
        return idParam;
    }

    const setIdParam = function (id) {
        idParam.Id = id;
    }
    return {
        fetchData: async function (url) {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        },
        fetchBatchData: async function (url, bundledData) {
            let batchedData = generateBatches.batchify(bundledData);
            let batchedDataValue = [];
            for (let index = 0; index < batchedData.length; index++) {
                setMultiCoinValueParam(batchedData[index].toString());
                let urlParams = generateUrlParams.encodeObjectToUrlParam(mutiCoinValueParam);
                await this.fetchData(url + urlParams).then((batchedJsonValue) => batchedDataValue.push(batchedJsonValue));
            }
            console.log(batchedDataValue[0]);
            return batchedDataValue;
        },
        fetchParallelBatchData: async function (url, bundledData) {
            // let batchedData = generateBatches.batchify(bundledData);
            // console.log(batchedData);
            // let parallelDataArray = [];
            // await (async () => {
            //     for (let index = 0; index < batchedData.length; index++) {
            //         let parallelData = await Promise.all([
            //             (() => {
            //                 let urlParams;
            //                 for (let pivot = 0; pivot < batchedData[index].length; pivot++) {
            //                     setIdParam(batchedData[index][pivot])
            //                     urlParams = generateUrlParams.encodeObjectToUrlParam(idParam);
            //                     this.fetchData(url + urlParams).then((data) => {
            //                         parallelDataArray.push(data);
            //                     })
            //                 }
            //             })()
            //         ]);
            //     }
            // })()
            // setTimeout(() => {

            //     console.log(parallelDataArray);
            //     return parallelDataArray
            // }, 30000);
            let parallelDataArray = [];
            let urlParams;
            for (let index = 0; index < /*bundledData.length  ---too large*/200; index++) {

                setIdParam(bundledData[index])
                urlParams = generateUrlParams.encodeObjectToUrlParam(idParam);
                await this.fetchData(url + urlParams).then((data) => {
                    parallelDataArray.push(data);
                })

            }
            return parallelDataArray
        }
    }
})();