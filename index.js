"use strict";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const classes = {
    buttonTray: "THeKv",
    selectAll: "snapselectall",

    selector: "FtrwS",
    unselected: "DYSLz"
};

const button =
    "<div class='snapselectall c47Sk' role='button' tabindex='0'>Select all</div>";

let selecting = false;

const observer = new MutationObserver(() => {
    // button tray
    const buttonTray = document.getElementsByClassName(classes.buttonTray)[0];
    if (!buttonTray) return;

    // select all button already exists
    if (document.getElementsByClassName(classes.selectAll)[0]) return;

    buttonTray.insertAdjacentHTML("beforeend", button);
    document
        .getElementsByClassName("snapselectall")[0]
        .addEventListener("click", async () => {
            const elements = document.getElementsByClassName(classes.selector);

            // if something is unselected, set selecting to true
            selecting = Array.from(elements).some(element =>
                element.classList.contains(classes.unselected)
            );

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (
                    !element.classList.contains(classes.unselected) &&
                    selecting
                )
                    continue;

                await delay(1);
                element.parentElement.click();
            }
        });
});

observer.observe(document, {
    childList: true,
    subtree: true
});
