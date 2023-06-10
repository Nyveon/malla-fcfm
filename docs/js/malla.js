"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 8 */
/* jshint browser: true */
/* globals navigation */

const lines = [];
let currentSelected = null;
let showLines = true;

/* Course interaction --------------------------------------------- */

/**
 * Returns if the window is a touch device
 * @returns {boolean} true if the window is a touch device, else false
 */
function isTouchEvent() {
	return (
		"ontouchstart" in document.documentElement ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

/**
 * Removes all leader lines from the page
 */
function removeLines() {
	for (let i = lines.length - 1; i >= 0; i--) {
		lines[i].remove();
		lines.splice(i, 1);
	}
}

/**
 * Selects the current course, and propagates changes as necessary
 * @param {object} params:
 *  @param {list} prerequisites list of preqrequisite course IDs
 *  @param {list} postrequisites list of postrequisite course IDs
 *  @param {boolean} selected true for selected, false for unselected
 *  @param {string} element the course element to select
 * @param {string} event the name of the event that triggered the selection
 * @param {boolean} showingLines if lead lines should be shown
 * @param {int} depthpre the depth of the prerequisite tree
 * @param {int} depthpost the depth of the postrequisite tree
 */
function courseSelected(
	{ prerequisites, postrequisites, element },
	event,
	showingLines,
	depthpre,
	depthpost
) {
	let selected = element.classList.contains("selected");
	showLines = showingLines;

	console.log("test");

	console.log(event);

	if (isTouchEvent() && event === "click") {
		if (selected) {
			element.classList.remove("selected");
			propagatePrereq(prerequisites, 0, 12, false, element);
			propagatePostreq(postrequisites, 0, 12, false, element);
			removeLines();
			currentSelected = null;
		} else {
			element.classList.add("selected");
			if (currentSelected) {
				// Unpropagate and unselect whatever was already selected
				currentSelected.classList.remove("selected");
				propagatePrereq(
					getPrereqs(currentSelected),
					0,
					12,
					false,
					currentSelected
				);
				propagatePostreq(
					getPostreqs(currentSelected),
					0,
					12,
					false,
					currentSelected
				);
				removeLines();
			}
			propagatePrereq(prerequisites, 0, depthpre, true, element);
			propagatePostreq(postrequisites, 0, depthpost, true, element);
			currentSelected = element;
		}
	} else {
		if (event === "mouseenter") {
			selected = true;
		}
		if (event === "mouseleave") {
			selected = false;
		}

		propagatePrereq(prerequisites, 0, depthpre, selected, element);
		propagatePostreq(postrequisites, 0, depthpost, selected, element);

		// Delete all leader-lines and update selected class
		if (selected) {
			element.classList.add("selected");
			currentSelected = element;
		} else {
			removeLines();
			element.classList.remove("selected");
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
	if (window.getComputedStyle(start).display === "none") {
		return;
	}
	if (!showLines) {
		return;
	}
	const line = new LeaderLine(start, end, {
		color: "red",
		startSocket: "bottom",
		startSocketGravity: 10,
		endSocket: "top",
		endSocketGravity: 10,
		path: "flow",
		size: 3,
		dropShadow: { blur: 4, dx: 3, dy: 3 },
		color: getComputedStyle(document.documentElement).getPropertyValue(color),
		hide: true,
	});
	line.show("draw", { duration: 200, easing: "linear" });
	lines.push(line);
}

/**
 * Adds the corresponding relative depth class to an element
 * @param {element} element element to add the class to
 * @param {int} depth current depth
 * @param {int} maxdepth maximum depth
 */
function addDepthClass(element, depth, maxdepth) {
	element.classList.add(`depth-${Math.floor((10 * depth) / maxdepth)}`);
}

/**
 * Removes all depth classes from an element
 * @param {element} element element to remove the classes from
 */
function removeDepthClasses(element) {
	for (let i = element.classList.length - 1; i >= 0; i--) {
		const className = element.classList[i];
		if (className.startsWith("depth-")) {
			element.classList.remove(className);
		}
	}
}

/**
 * Gets the prerequisites of a course from the data attribute
 * @param {element} element element to get the prerequisites from
 * @returns {list} list of prerequisite course IDs
 */
function getPrereqs(element) {
	const prereqPrereqs = element.dataset.prereqs;
	return prereqPrereqs.split(",");
}

/**
 * Gets the postrequisites of a course from the data attribute
 * @param {element} element element to get the postrequisites from
 * @returns {list} list of postrequisite course IDs
 */
function getPostreqs(element) {
	const postreqPostreqs = element.dataset.postreqs;
	return postreqPostreqs.split(",");
}

/**
 * Propagaste classes for prerequisites tree
 * @param {list} prerequisites list of string IDs of prerequisite courses
 * @param {int} depth current depth of the tree
 * @param {int} maxdepth maximum depth of the tree
 * @param {boolean} state true for selected, false for unselected
 * @param {element} element element to propagate from
 */
function propagatePrereq(prerequisites, depth, maxdepth, state, element) {
	if (depth == maxdepth) {
		return;
	}

	for (let i = 0; i < prerequisites.length; i++) {
		let prereq = document.getElementById(prerequisites[i]);
		if (!prereq) {
			continue;
		}

		if (state) {
			if (!prereq.classList.contains("prerequisite")) {
				prereq.classList.add("prerequisite");
				addDepthClass(prereq, depth, maxdepth);
				createLine(prereq, element, "--line-color-pre", false);
			}
		} else {
			if (prereq.classList.contains("prerequisite")) {
				prereq.classList.remove("prerequisite");
				removeDepthClasses(prereq);
			}
		}
		const prereqPrereqsList = getPrereqs(prereq);
		propagatePrereq(prereqPrereqsList, depth + 1, maxdepth, state, prereq);
	}
}

/**
 * Propagaste classes for postrequisites tree
 * @param {list} prerequisites list of string IDs of postrequisites courses
 * @param {int} depth current depth of the tree
 * @param {int} maxdepth maximum depth of the tree
 * @param {boolean} state true for selected, false for unselected
 * @param {element} element element to propagate from
 */
function propagatePostreq(postrequisites, depth, maxdepth, state, element) {
	if (depth == maxdepth) {
		return;
	}

	for (let i = 0; i < postrequisites.length; i++) {
		let postreq = document.getElementById(postrequisites[i]);
		if (!postreq) {
			continue;
		}

		if (state) {
			if (!postreq.classList.contains("postrequisite")) {
				postreq.classList.add("postrequisite");
				addDepthClass(postreq, depth, maxdepth);
				createLine(element, postreq, "--line-color-post");
			}
		} else {
			if (postreq.classList.contains("postrequisite")) {
				postreq.classList.remove("postrequisite");
				removeDepthClasses(postreq);
			}
		}
		const postreqPostreqsList = getPostreqs(postreq);
		propagatePostreq(postreqPostreqsList, depth + 1, maxdepth, state, postreq);
	}
}
