# malla-fcfm

Interactive visualization for the degree roadmaps at the Faculty of Physical Sciences and Mathematics of the University of Chile.

Visualización interactiva de mallas académicas de la Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile.

## Implementation

- UI Framework: [AlpineJS](https://alpinejs.dev)
- Hosting: [SPA Github Pages](https://github.com/rafgraph/spa-github-pages)
- Data processing: Python and lots of manual data entry.

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

- [ ] SASS for repetitive CSS.
- [ ] Typescript for better code quality.
- [ ] Maybe look into a templating engine.
- [ ] Installation and contribution documentation.
- [ ] Perfect responsive design.
- [ ] Check load times and accesibility data.
- [ ] Perfect color palettes.

#### Data processing

- [x] Basic single degree data processing.
- [ ] Postrequisite processing.
- [ ] Automatic data processing for all degrees.

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
- [ ] v3/v5 propmt.

### Malla features

- [x] Base page.
- [x] Basic course rendering.
- [x] Course credits and code.
- [x] Phase and semester indicators.
- [ ] Responsive phases and semesters.
- [ ] Prerequisite highlighting.
- [ ] Altprequisite highlighting.
- [ ] Postrequisite highlighting.
- [ ] Corequisite highlighting.
- [ ] Multiple course layer propagation.
- [ ] Propagation depth configuration.
- [ ] Hide/show 0 credit courses.

### Mallas

#### v5

- [ ] Civil ECG.
- [ ] Civil HSA.
- [ ] Civil Transporte.
- [ ] Computación (first).
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
