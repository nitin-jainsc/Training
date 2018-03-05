require("jquery")
import {
    activeChartLoader
} from "./chartLoader"

import {
    fetchCurrency
} from "./currencySelector";

export const activeViewLoader = (() => {

    let section1 = () => {
        console.log("IN LOAD TOP CURRENCY BY VALUE");
        // Async function to fetch and load top 10 cryptocurrencies by value and facebook likes

        if (sessionStorage.getItem("topCurrByValue") == undefined || sessionStorage.getItem("topCurrBySocial") == undefined) {
            fetchCurrency.getTop10CurrencyByValue().then((top10CurrencyByValue) => {
                let ctx = document.getElementById("topCurrencyByValue").getContext('2d');
                let labelByValue = top10CurrencyByValue.map((obj) => obj.coin);
                let dataByValue = top10CurrencyByValue.map((obj) => obj.value);
                sessionStorage.setItem("topCurrByValue", JSON.stringify(top10CurrencyByValue));
                activeChartLoader.loadChart(ctx, "bar", labelByValue, dataByValue);
            }).catch((e) => console.log(e));

            fetchCurrency.getTop10CurrencyBySocial().then((top10CurrencyBySocial) => {
                let ctxSocial = document.getElementById("topCurrencyBySocial").getContext('2d');
                let labelBySocial = top10CurrencyBySocial.map((obj) => obj.coin);
                let dataBySocial = top10CurrencyBySocial.map((obj) => obj.likes);
                sessionStorage.setItem("topCurrBySocial", JSON.stringify(top10CurrencyBySocial));
                activeChartLoader.loadChart(ctxSocial, "bar", labelBySocial, dataBySocial);
            }).catch((e) => console.log(e))

        } else {
            let top10CurrencyByValue = JSON.parse(sessionStorage.getItem("topCurrByValue"));
            let ctx = document.getElementById("topCurrencyByValue").getContext('2d');
            let labelByValue = top10CurrencyByValue.map((obj) => obj.coin);
            let dataByValue = top10CurrencyByValue.map((obj) => obj.value);
            activeChartLoader.loadChart(ctx, "bar", labelByValue, dataByValue);

            let top10CurrencyBySocial = JSON.parse(sessionStorage.getItem("topCurrBySocial"));
            let ctxSocial = document.getElementById("topCurrencyBySocial").getContext('2d');
            let labelBySocial = top10CurrencyBySocial.map((obj) => obj.coin);
            let dataBySocial = top10CurrencyBySocial.map((obj) => obj.likes);
            activeChartLoader.loadChart(ctxSocial, "bar", labelBySocial, dataBySocial);
        }


    }

    let section2 = () => {
        console.log("section2");
        activeChartLoader.loadChart("area")

    }
    let section3 = () => {
        $.getJSON("https://www.cryptocompare.com/api/data/coinlist/", (data) => {
            let coinlist = data.Data
            $("#toCurrencyCompare").html($("<option disabled></option>"));
            $("#fromCurrencyCompare").html($("<option disabled></option>"));
            $.each(coinlist, (data) => {
                $("#toCurrencyCompare").append($("<option></option>").attr("value", data).text(data));
                $("#fromCurrencyCompare").append($("<option></option>").attr("value", data).text(data));
            })
        })

    }
    let section4 = () => {
        $.getJSON("https://www.cryptocompare.com/api/data/coinlist/", (data) => {
            let coinlist = data.Data
            let ddList = [];
            $("#toCurrency").html($("<option disabled></option>"));
            $("#fromCurrency").html($("<option disabled></option>"));
            $.each(coinlist, (data) => {
                $("#toCurrency").append($("<option></option>").attr("value", data).text(data));
                $("#fromCurrency").append($("<option></option>").attr("value", data).text(data));
            })
        })
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