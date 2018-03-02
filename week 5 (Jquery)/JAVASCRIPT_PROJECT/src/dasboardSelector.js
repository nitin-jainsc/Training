require("jquery")

import {
    activeViewLoader
} from "./viewLoader"

// Module to manage view of the dashboard
export const activeViewFetcher = (() => {

    // Private function to load the view functionality
    let loadView = (anchor) => {
        activeViewLoader.loadView(anchor);

    }
    return {
        // Closure function to activate(show) clicked view 
        fetchView: (anchor) => {
            // viewPane is the id of the section to be activated
            const viewPane = anchor.href.substring(23, anchor.href.length);
            const mainSection = document.getElementById('viewPoint').querySelectorAll(":scope > div")
            for (let i = 0; i < mainSection.length; i++) {
                if (mainSection[i].getAttribute("id") == viewPane) {
                    // Adds active view to the session of the window for state save and refresh
                    sessionStorage.setItem("sectionId", viewPane);
                    mainSection[i].classList.remove("hide");
                    loadView(viewPane);
                } else {
                    mainSection[i].classList.add("hide");
                }
            }
        },
        // Closure function to update the window from the saved state
        updateView: (anchor) => {
            const mainSection = $("#viewPoint").children();    
            for (let section of mainSection) {
                if ($(section).attr("id") == anchor) {
                    $(section).removeClass("hide");
                    loadView(anchor);
                } else {
                    $(section).addClass("hide");
                }                
            }
        }
    }
})();