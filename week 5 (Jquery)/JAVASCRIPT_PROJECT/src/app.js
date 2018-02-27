window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
require('bootstrap')

import {
    activeViewFetcher
} from "./dashboardSelector";

// tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// use tooltip and popover components everywhere
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
})

// Your code here....

// MODULE TO FETCH DASHBOARD VIEW
let viewAnchors = document.getElementById("dashboardSidebar").querySelectorAll(":scope > li > a")
for (let index = 0; index < viewAnchors.length; index++) {
    const element = viewAnchors[index];
    element.addEventListener("click", () => {
        activeViewFetcher.fetchView(element);
    })
}

