"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 8 */
/* jshint browser: true */
/* globals navigation */

/*  Routing --------------------------------------------- */

// Interception of  navigation events.
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
    }(window.location))


/**
 * Gets the current page state from the path
 * @param {string} path
 * @param {object} degrees
 * @returns {number} integer. 0 for homepage, 1 for roadmap, -1 otherwise.
 */
function getPageState(path, degrees) {
    // Split path by slashes, remove any trailing or leading slashes and empty strings
    if (path === '') {
        return 0;
    } else if (path in degrees) {
        return 1;
    } else {
        return -1;
    }
}

const lines = [];

/**
 * Selects the current course, and propagates changes as necessary
 * @param {object} params:
 *  @param {list} prerequisites list of preqrequisite course IDs
 *  @param {list} postrequisites list of postrequisite course IDs
 *  @param {boolean} selected true for selected, false for unselected
 *  @param {int} depthpre the depth of the prerequisite tree
 *  @param {int} depthpost the depth of the postrequisite tree
 *  @param {string} id ID of the course to select
 */
function courseSelected({prerequisites, postrequisites, selected, depthpre, depthpost, id}) {
    propagatePrereq(prerequisites, 0, depthpre, selected, id);
    propagatePostreq(postrequisites, 0, depthpost, selected, id);

    // Delete all leader-lines
    if (!selected) {
        for (let i = lines.length - 1; i >= 0; i--) {
            lines[i].remove();
            lines.splice(i, 1);
        }
    }
}

/**
 * Creates a leader line between two elements
 * @param {id} start element id
 * @param {id} end element id
 * @param {string} color CSS variable name
 * @param {boolean} flipped true if the line should be flipped
 */
function createLine(start, end, color) {
    const line = new LeaderLine(start, end, {
        color: 'red',
        startSocket: 'bottom',
        startSocketGravity: 10,
        endSocket: 'top',
        endSocketGravity: 10,
        path: 'magnet',
        size: 2,
        dropShadow: {blur: 5, dx: 3, dy: 3},
        color: getComputedStyle(document.documentElement)
        .getPropertyValue(color)
    });
    lines.push(line);
}

/**
 * Adds the corresponding relative depth class to an element
 * @param {element} element element to add the class to
 * @param {int} depth current depth
 * @param {int} maxdepth maximum depth
 */
function addDepthClass(element, depth, maxdepth) {
    element.classList.add(`depth-${Math.floor(10 * depth / maxdepth)}`);
}

/**
 * Removes all depth classes from an element
 * @param {element} element element to remove the classes from
 */
function removeDepthClasses(element) {
    for (let i = element.classList.length - 1; i >= 0; i--) {
        const className = element.classList[i];
        if (className.startsWith('depth-')) {
            element.classList.remove(className);
        }
    }
}


function propagatePrereq(prerequisites, depth, maxdepth, state, id) {
    if (depth == maxdepth) {return;}

    for (let i = 0; i < prerequisites.length; i++) {
        let prereq = document.getElementById(prerequisites[i]);
        if (!prereq) {continue;}

        if (state) {
            if (!prereq.classList.contains('prerequisite')) {
                prereq.classList.add('prerequisite');
                addDepthClass(prereq, depth, maxdepth);
                createLine(prereq, id, '--line-color-pre', false);
            }
        } else {
            if (prereq.classList.contains('prerequisite')) {
                prereq.classList.remove('prerequisite');
                removeDepthClasses(prereq);
            }
        }
        let prereqPrereqs = prereq.dataset.prereqs;
        let prereqPrereqsList = prereqPrereqs.split(',');
        propagatePrereq(prereqPrereqsList, depth + 1, maxdepth, state, prereq);
    }
}

function propagatePostreq(postrequisites, depth, maxdepth, state, id) {
    if (depth == maxdepth) {return;}

    for (let i = 0; i < postrequisites.length; i++) {
        let postreq = document.getElementById(postrequisites[i]);
        if (!postreq) {continue;}

        if (state) {
            if (!postreq.classList.contains('postrequisite')) {
                postreq.classList.add('postrequisite');
                addDepthClass(postreq, depth, maxdepth);
                createLine(id, postreq, '--line-color-post');
            }
        } else {
            if (postreq.classList.contains('postrequisite')) {
                postreq.classList.remove('postrequisite');
                removeDepthClasses(postreq);
            }
        }
        let postreqPostreqs = postreq.dataset.postreqs;
        let postreqPostreqsList = postreqPostreqs.split(',');
        propagatePostreq(postreqPostreqsList, depth + 1, maxdepth, state, postreq);
    }
}

