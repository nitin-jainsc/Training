window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
require('bootstrap')
import {
    calculateCurrency
} from "./currencyCalculator";
import {
    activeViewFetcher
} from "./dasboardSelector";

import {
    fetchCurrency
} from "./currencySelector";

import './index.scss'

// include bootstrap css file with own modifications
// tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// use tooltip and popover components everywhere
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
})

// Your code here....


// This function is used to fetch and load the current view of the dashboard 
// based on the sidebar cick.
let viewAnchors = document.getElementById("dashboardSidebar").querySelectorAll(":scope > li > a")
for (let index = 0; index < viewAnchors.length; index++) {
    //viewAnchors is the nodelist of all the anchor tags in navbar
    const element = viewAnchors[index];
    element.addEventListener("click", () => {
        // Onclik event listener is added on anchor tag which fetches and loads the current view on click on the specific anchor tag
        activeViewFetcher.fetchView(element);
    })
}

// Code to save and restore te page state in session Storage
$(window).on("load", () => {
    // Check for new window to load homepage
    if (sessionStorage.getItem("sectionId") == undefined) {
        activeViewFetcher.updateView("section1");
    } else {
        // Check for refresh or reload from saved state
        activeViewFetcher.updateView(sessionStorage.getItem("sectionId"))
    }
})

// This function is used to calculate the result of the currency converter
// getResult is the submit button for currency converter
$("#getResult").on('click', () => {
    // Verification to check for the empty values in the fromVal input box  
    if ($("#fromVal").val() == "") {
        alert("No value present. Plz enter some value first")
    } else {
        // User defined function to convert the currency based on the current exchange rates
        calculateCurrency.calculateExchangeValue();
    }
});