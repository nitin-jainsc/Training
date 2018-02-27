export const generateBatches = (()=>{
    return {
        // USED TO BREAK LARGE DATA ITO SMALL ARRAY BATCHES
        batchify: function(cumulativeData) {
            let batchSize=Math.floor(cumulativeData.length/100);            
            let tempBatch=[];
            let batchedData=[];
            for (let index = 0; index < cumulativeData.length; index+=batchSize) {
                tempBatch=cumulativeData.slice(index,index+batchSize);
                batchedData.push(tempBatch);
            }
            return batchedData;
        }
    }
})();


export const generateUrlParams = (()=>{
    return {
        encodeObjectToUrlParam: function (targetObject) {            
            let urlParams = Object.keys(targetObject).map(function (key) {
                return encodeURIComponent(key)+ "=" +encodeURIComponent(targetObject[key]);
            }) .join("&");            
            return urlParams;
        }
    }
})();