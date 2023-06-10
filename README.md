# malla-fcfm

EN: Interactive visualization for the degree roadmaps at the Faculty of Physical Sciences and Mathematics of the University of Chile.

ES: Visualización interactiva de mallas académicas de la Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile.

## Implementation

- **JS & HTML:**
  - **Framework:** [AlpineJS](https://alpinejs.dev) (*3.10.5*)
  - **Library:** [LeaderLine](https://github.com/anseki/leader-line/) (*1.0.7*)
- **CSS:** [SASS](https://sass-lang.com)
- **CDN:** [jsDelivr](https://www.jsdelivr.com)
- **Data:** [Python](https://www.python.org) (and lots of manual data entry).

## Agradecimientos (ES)

- [Sleivav](https://github.com/sleivav), por la idea y el diseño inicial de una malla interactiva.
- El [CaDCC](https://cadcc.cl) y compañeros contribuidores de [malla-dcc](https://github.com/cadcc/malla-dcc). [vmkovacs](https://github.com/vmkovacs) y [PuntitOwO](https://github.com/PuntitOwO).
- [SebaaAguilera](https://github.com/SebaaAguilera) por comenzar el esfuerzo de rehacer la malla DCC sin Vue.

## Resources & References

- Cover images: [Pexels](https://www.pexels.com).
- Icons: [Uxwing](https://uxwing.com).
- Fonts: [Google Fonts](https://fonts.google.com).
- Mallas v3: [Ingeniería U-Chile](https://ingenieria.uchile.cl/escuela/pregrado/mallas-curriculares/mallas-curriculares-2007)
- Mallas v5: [Ingeniería U-Chile](https://ingenieria.uchile.cl/escuela/pregrado/mallas-curriculares/mallas-curriculares-2019)

## Development

- placeholder

## TO-DO

### General features

- [x] SASS for repetitive CSS.
- [x] ~~Typescript for better code quality.~~ (not needed at current scope?)
- [x] Maybe look into a templating engine. (Looked into it, not necessary for the scope of this project)
- [x] Perfect responsive design.
- [x] Perfect color palettes.
- [x] Fix 404 page flashing on load.
- [x] Make "Mallas FCFM" link to home page.
- [x] Fix tap on mobile.
- [x] Fix incompatiability with firefox due to navigation api.
- [x] Fix firefox writing orientation causing sizing issues.
- [x] Fix leader lines being drawn after leaving.
- [x] Set up composition classes and consistent spacing sizes.

- [ ] Change to Static Generation v/s SPA with Alpine:
  - [x] Change to NPM package.
  - [x] Install Eleventy.
  - [x] Refactor mallas to statically generate.
  - [ ] Make 404 redirect to simulate case insensitive URL.
- [ ] JS/HTML/CSS contribution documentation.
  - [ ] Folder/file structure documentation.
- [ ] Data contribution documentation.
- [ ] Check load times and accesibility data.
- [ ] Optimize image file format and sizes.
- [ ] Abstract CSS variables for theme colors.
- [ ] Figure out course show/hide animations

#### Data processing

- [x] Basic single degree data processing.
- [x] Postrequisite processing.
- [x] Webscraping for course data

- [ ] Automatic data processing for all degrees.

#### UI

- [x] Basic navbar.
- [x] Settings hamburger menu.
- [x] Basic footer.
- [x] Github Icon.
- [x] Fix clamp on number input values.

- [ ] About modal.
- [ ] Improve breadcrumb.
- [ ] Credits to contributors for specific mallas.
- [ ] Theme selector (Expand this into actual color themes as well).

### Homepage features

- [x] Static SPA Routing.
- [x] Degree catalogue.
- [x] Redirects and 404.

### Malla features

- [x] Base page.
- [x] Basic course rendering.
- [x] Course credits and code.
- [x] Phase and semester indicators.
- [x] Responsive phases and semesters.
- [x] Prerequisite highlighting.
- [x] Postrequisite highlighting.
- [x] ~~Corequisite highlighting.~~ No longer exists!
- [x] ~~Color code legend.~~ No ambiguous colors needing explanation.
- [x] Fix: Click to keep highlighted.
- [x] Multiple course layer propagation.
- [x] Propagation depth configuration.
- [x] Hide/show 0 credit courses.
- [x] Combine same-code courses into one card. (Whole new data structure needed)
- [x] Fix: On mobile you can select multiple courses
- [x] Leader lines for prerequisites.
- [x] Hide/show leader-lines
- [x] High quality pre/postrequisite highlighting

- [ ] Semester alternating colors.
- [ ] Altprequisite highlighting. (To be implemented when a malla with altprequisites is added)
- [ ] Sources for mallas.

### Mallas

- [x] Fix IQ2211, FI2001, MA2001 Post requisites.

- [ ] Civil ECG.
- [ ] Civil HSA.
- [ ] Civil Transporte.
- [x] Computación
- [ ] Electrica.
- [ ] Industrial.
- [ ] Matemática.
- [ ] Mecánica.
- [ ] Minas.
- [ ] Química.
- [ ] Biotecnología.
- [ ] Geología.
- [ ] Astronomía.
- [ ] Física.
- [ ] Geofísica.
