window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
require('bootstrap')
require('chart.js')

import {
    activeViewFetcher
} from "./dasboardSelector";

import {
    fetchCurrency
} from "./currencySelector";

import './index.scss' // include bootstrap css file with own modifications
import {
    dataFetchApi
} from './fetchApi';

// tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// use tooltip and popover components everywhere
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
})

// Your code here....

let viewAnchors = document.getElementById("dashboardSidebar").querySelectorAll(":scope > li > a")
for (let index = 0; index < viewAnchors.length; index++) {
    const element = viewAnchors[index];
    element.addEventListener("click", () => {
        activeViewFetcher.fetchView(element);
    })
}
async function loadTop10CurrencyByValue() {
    try {
        console.log("IN LOAD TOP CURRENCY BY VALUE");
        let top10CurrencyByValue;
        await fetchCurrency.getTop10CurrencyByValue().then((data)=>{
            top10CurrencyByValue=data;
            console.log(top10CurrencyByValue);
        });
        // await fetchCurrency.getTop10CurrencyBySocial()
        console.log("TOP 10 COINS BY VALUE SUCCESSFULLY LOADED");
        let ctx = document.getElementById("topCurrencyByValue").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: top10CurrencyByValue.map((obj)=>obj.coin),
                datasets: [{
                    label: 'USD Value',
                    data: top10CurrencyByValue.map((obj)=>obj.value),
                    backgroundColor: [
                        'red',
                        'green',
                        'blue',
                        'red',
                        'green',
                        'blue',
                        'red',
                        'green',
                        'blue',
                        'red'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
    } catch (e) {
        console.log("FAILED TO LOAD TOP CURRENCY BY VALUE");
    }
}
// loadTop10CurrencyByValue();
async function loadTop10CurrencyBySocial() {
    let top10CurrencyBySocial;
    await fetchCurrency.getTop10CurrencyBySocial().then(
        (data)=>top10CurrencyBySocial=data
    ).catch((e)=>console.log(e))
    console.log(top10CurrencyBySocial);



    let ctx = document.getElementById("topCurrencyBySocial").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top10CurrencyBySocial.map((obj)=>obj.coin),
            datasets: [{
                label: 'FB LIKES',
                data: top10CurrencyBySocial.map((obj)=>obj.likes),
                backgroundColor: [
                    'red',
                    'green',
                    'blue',
                    'red',
                    'green',
                    'blue',
                    'red',
                    'green',
                    'blue',
                    'red'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    
    
}
loadTop10CurrencyByValue();
loadTop10CurrencyBySocial();