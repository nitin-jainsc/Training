window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
require('bootstrap')
require('chart.js')
import { calculateCurrency } from "./currencyCalculator";
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

$("#getResult").on('click',()=>{
    console.log($("#fromVal").val());
    
    if($("#fromVal").val()==""){
       alert("No value present. Plz enter some value first")
    }else{
        calculateCurrency.calculateExchangeValue();
    }
});
