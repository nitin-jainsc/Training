import {
    activeChartLoader
} from "./chartLoader"

import {
    fetchCurrency
} from "./currencySelector";

export const activeViewLoader = (() => {
    let section1 = async () => {
        console.log("IN LOAD TOP CURRENCY BY VALUE");
        let top10CurrencyByValue;
        await fetchCurrency.getTop10CurrencyByValue().then((data) => {
            top10CurrencyByValue = data;
        });
        let ctx = document.getElementById("topCurrencyByValue").getContext('2d');
        let labelByValue = top10CurrencyByValue.map((obj) => obj.coin);
        let dataByValue = top10CurrencyByValue.map((obj) => obj.value);
        activeChartLoader.loadChart(ctx, "bar", labelByValue, dataByValue);

        let top10CurrencyBySocial;
        await fetchCurrency.getTop10CurrencyBySocial().then(
            (data) => top10CurrencyBySocial = data
        ).catch((e) => console.log(e))
        let ctxSocial = document.getElementById("topCurrencyBySocial").getContext('2d');
        let labelBySocial = top10CurrencyBySocial.map((obj) => obj.coin);
        let dataBySocial = top10CurrencyBySocial.map((obj) => obj.likes);
        activeChartLoader.loadChart(ctxSocial, "bar", labelBySocial, dataBySocial);

    }
    let section2 = () => {
        console.log("section2");
        activeChartLoader.loadChart("area")

    }
    let section3 = () => {
        console.log("section3");

    }
    let section4 = async () => {
        console.log("hello");
        

    }
    return {
        loadView(section) {
            switch (section) {
                case "section1":
                    section1();
                    break;
                case "section2":
                    section2();
                    break;
                case "section3":
                    section3();
                    break;
                case "section4":
                    section4();
                    break;

                default:
                    break;
            }
        }
    }
})();