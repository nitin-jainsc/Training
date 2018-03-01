import {
    activeViewLoader
} from "./viewLoader"

export const activeViewFetcher = (() => {
    let loadView = (anchor) => {
        activeViewLoader.loadView(anchor);

    }
    return {
        fetchView: (anchor) => {
            const viewPane = anchor.href.substring(23, anchor.href.length);
            const mainSection = document.getElementById('viewPoint').querySelectorAll(":scope > div")
            for (let i = 0; i < mainSection.length; i++) {
                if (mainSection[i].getAttribute("id") == viewPane) {
                    mainSection[i].classList.remove("hide");
                    loadView(viewPane);
                } else {
                    mainSection[i].classList.add("hide");
                }
            }
        }
    }
})();