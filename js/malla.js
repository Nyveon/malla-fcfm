"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 8 */
/* jshint browser: true */
/* globals navigation */


// Intercept navigation (SPA-ification)
/*
navigation.addEventListener('navigate', navigateEvent => {

    const url = new URL(navigateEvent.destination.url);

    if (url.pathname === '/') {
        navigateEvent.intercept({
            async handler() {
                state.page = "home";
            }
        });
    } else {
        navigateEvent.intercept({
            async handler() {
                state.page = url.pathname.slice(1);
                console.log(state)
            }
        });
    }
});
*/
