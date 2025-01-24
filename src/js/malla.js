"use strict";
// Site by Eric K.
/* jshint globalstrict: true */
/* jshint esversion: 8 */
/* jshint browser: true */
/* globals navigation */

const touchDevice = matchMedia("(hover: none)").matches;
const lines = [];
let currentSelected = null;
let showLines = true;

/* Course interaction --------------------------------------------- */

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
	depthpost,
	editMode
) {
	let selected = element.classList.contains("selected");
	showLines = showingLines;

	if (editMode) {
		return;
	}

	if (touchDevice && event === "click") {
		if (selected) {
			element.classList.remove("selected");
			propagatePrereq(prerequisites, 0, 12, false, element);
			propagatePostreq(postrequisites, 0, 12, false, element);
			removeLines();
			currentSelected = null;
		} else {
			element.classList.add("selected");
			if (currentSelected) {
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
 * Propagates classes for prerequisites tree
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
 * Propagates classes for postrequisites tree
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

/**
 * Marks a course as selected or unselected
 * @param {element} element Course element
 * @param {string} editMode Edit mode status
 * @param {number} editModeColor Index of marker color
 */
function courseMarked(element, editMode, editModeColor) {
	if (!editMode) {
		return;
	}

    if (element.classList.contains("marked")) {
        console.log(element.dataset.markColor, editModeColor)
        if (element.dataset.markColor == editModeColor) {
            element.classList.remove("marked");
        } else {
            element.dataset.markColor = editModeColor;
        }
    } else {
        element.classList.add("marked");
        element.dataset.markColor = editModeColor;
    }

	const markedElements = document.querySelectorAll(
		".marked:not([style*='display: none'])"
	);
	const markedCount = markedElements.length;
	const courseElements = document.querySelectorAll(
		".course:not([style*='display: none'])"
	);
	const courseCount = courseElements.length;

	if (markedCount == courseCount) {
		var duration = 8 * 1000;
		var animationEnd = Date.now() + duration;
		var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		var interval = setInterval(function () {
			var timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			var particleCount = 50 * (timeLeft / duration);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				})
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				})
			);
		}, 250);
	}
}

/**
 * Marks an entire semester's courses as selected or unselected
 * @param {element} element Semester number element
 * @param {boolean} editMode If edit mode is enabled
 */
function semesterMarked(element, editMode) {
    if (!editMode) {
		return;
	}

    const semesterCourses = element.nextElementSibling;
    const courses = semesterCourses.querySelectorAll(".course");

    courses.forEach(course => {
        courseMarked(course, editMode);
    });
}

/**
 * Un-marks all marked courses
 */
function clearAllMarks() {
    if (window.confirm("¿Des-marcar todos los cursos marcados?")) {
        const markedElements = document.querySelectorAll(".marked");
        markedElements.forEach(element => {
            element.classList.remove("marked");
        });
    }
}