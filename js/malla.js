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

function courseSelected({prerequisites, selected, depthpre, depthpost, id}) {
    propagatePrereq(prerequisites, 0, depthpre, selected, id);

    if (!selected) {
        for (let i = lines.length - 1; i >= 0; i--) {
            lines[i].remove();
            lines.splice(i, 1);
        }
    }
}

function propagatePrereq(prerequisites, depth, maxdepth, state, id) {
    if (depth == maxdepth) {
        return;
    }

    for (let i = 0; i < prerequisites.length; i++) {
        let prereq = document.getElementById(prerequisites[i]);
        if (!prereq) {
            continue;
        }
        if (state) {
            if (!prereq.classList.contains('prerequisite')) {
                prereq.classList.add('prerequisite');
                prereq.classList.add(`depth-${Math.floor(10 * depth / maxdepth)}`);
                const line = new LeaderLine(prereq, id, {
                    color: 'red',
                    startSocket: 'bottom',
                    endSocket: 'top',
                    path: 'straight',
                    size: 2,
                });
                lines.push(line);
            }
        } else {
            if (prereq.classList.contains('prerequisite')) {
                prereq.classList.remove('prerequisite');
                for (let i = prereq.classList.length - 1; i >= 0; i--) {
                    const className = prereq.classList[i];
                    if (className.startsWith('depth-')) {
                        prereq.classList.remove(className);
                    }
                }
            }
        }
        let prereqPrereqs = prereq.dataset.prereqs;
        let prereqPrereqsList = prereqPrereqs.split(',');
        propagatePrereq(prereqPrereqsList, depth + 1, maxdepth, state, prereq);
    }
}

