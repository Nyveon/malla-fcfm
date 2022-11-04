"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 8 */
/* jshint browser: true */
/* globals navigation */

/*  Routing --------------------------------------------- */

/**
 * Pushes a new state without changing the page. Element must prevent default.
 * @param {element} element the element calling the navigation
 */
function navigate(element) {
    const url = new URL(element.href);
    history.pushState({}, '', url.pathname);
}


/**
 * Parses the path name. Removes any lead lines
 * Note: This should ONLY run on state push or pop
 * @returns {string} the important part of the current path
 */
function getPathname() {
    removeLines();
    return location.pathname.replace(/^\/|\/$/g, '');
}


// Single Page Apps for GitHub Pages, MIT License
// https://github.com/rafgraph/spa-github-pages
(function(l) {
    if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
    }
    }(window.location));


/**
 * Gets the current page state from the path
 * @param {string} path
 * @param {object} degrees
 * @returns {number} integer. 0 for homepage, 1 for roadmap, -1 otherwise.
 */
function getPageState(path, degrees) {
    if (!degrees) { return -2 };
    if (path === '') {
        return 0;
    } else if (path in degrees) {
        return 1;
    } else {
        return -1;
    }
}
