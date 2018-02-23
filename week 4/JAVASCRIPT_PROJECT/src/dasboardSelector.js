export const activeViewFetcher = (() => {
    return {
        fetchView: (anchor) => {
            const viewPane = anchor.href.substring(23, anchor.href.length);
            const mainSection = document.getElementById('viewPoint').querySelectorAll(":scope > div")
            for (let i = 0; i < mainSection.length; i++) {
                if (mainSection[i].getAttribute("id") == viewPane) {
                    mainSection[i].classList.remove("hide");
                } else {
                    mainSection[i].classList.add("hide");
                }
            }
        }
    }
})();