"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 6 */
/* jshint browser: true */
/* globals navigation */

// Intercept navigation (SPA-ification)
navigation.addEventListener('navigate', navigateEvent => {
    navigateEvent.intercept();
});

