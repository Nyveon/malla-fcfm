# malla-fcfm

Interactive visualization for the degree roadmaps at the Faculty of Physical Sciences and Mathematics of the University of Chile.

Visualización interactiva de mallas académicas de la Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile.

## Implementation

- **JS & HTML:** [AlpineJS](https://alpinejs.dev) (*3.10.5*)
- **CSS:** [SASS](https://sass-lang.com)
- **Hosting:** [SPA Github Pages](https://github.com/rafgraph/spa-github-pages)
- **Data:** [Python](https://www.python.org) (and lots of manual data entry).

## Agradecimientos (spanish)

- [Sleivav](https://github.com/sleivav), por la idea y el diseño inicial de una malla interactiva.
- El [CaDCC](https://cadcc.cl) y compañeros contribuidores de [malla-dcc](https://github.com/cadcc/malla-dcc). [vmkovacs](https://github.com/vmkovacs) y [PuntitOwO](https://github.com/PuntitOwO).
- [SebaaAguilera](https://github.com/SebaaAguilera) por comenzar el esfuerzo de rehacer la malla DCC sin Vue.

## Resources & References

- Cover images: [Pexels](https://www.pexels.com).
- Fonts: [Google Fonts](https://fonts.google.com).
- Mallas v3: [Ingeniería U-Chile](https://ingenieria.uchile.cl/escuela/pregrado/mallas-curriculares/mallas-curriculares-2007)
- Mallas v5: [Ingeniería U-Chile](https://ingenieria.uchile.cl/escuela/pregrado/mallas-curriculares/mallas-curriculares-2019)

## TO-DO

### General features

- [x] SASS for repetitive CSS.
- [ ] Typescript for better code quality.
- [x] Maybe look into a templating engine. (Looked into it, not necessary for the scope of this project)
- [ ] Installation and contribution documentation.
- [ ] Perfect responsive design.
- [ ] Check load times and accesibility data.
- [ ] Perfect color palettes.
- [ ] Fix 404 page flashing on load.
- [ ] Fix tap on mobile

#### Data processing

- [x] Basic single degree data processing.
- [ ] Postrequisite processing.
- [ ] Automatic data processing for all degrees.
- [x] Webscraping for course data

#### UI

- [x] Basic navbar.
- [ ] Improve breadcrumb.
- [ ] Settings hamburger menu.
- [ ] About modal.
- [ ] Theme selector (Expand this into actual color themes as well).
- [ ] v3/v5 selector.

### Homepage features

- [x] Static SPA Routing.
- [x] Degree catalogue.
- [x] Redirects and 404.
- [ ] v3/v5 prompt.

### Malla features

- [x] Base page.
- [x] Basic course rendering.
- [x] Course credits and code.
- [x] Phase and semester indicators.
- [x] Responsive phases and semesters.
- [x] Prerequisite highlighting.
- [ ] Altprequisite highlighting.
- [ ] Postrequisite highlighting.
- [x] ~~Corequisite highlighting.~~ No longer exists!
- [ ] Color code legend.
- [ ] Fix: Click to keep highlighted.
- [ ] Multiple course layer propagation.
- [ ] Propagation depth configuration.
- [ ] Hide/show 0 credit courses.
- [ ] Semester alternating color.
- [ ] Combine same-code courses into one card.
- [ ] Fix: On mobile you can selected multiple courses

### Mallas

#### v5

- [ ] Civil ECG.
- [ ] Civil HSA.
- [ ] Civil Transporte.
- [x] Computación (first).
  - [ ] Double check requisites
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

#### v3

- [ ] Civil ECG.
- [ ] Civil HSA.
- [ ] Civil Transporte.
- [ ] Computación.
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
