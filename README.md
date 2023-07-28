# malla-fcfm

EN: Interactive visualization for the degree roadmaps at the Faculty of Physical Sciences and Mathematics of the University of Chile.

ES: Visualización interactiva de mallas académicas de la Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile.

## Implementation

- [AlpineJS](https://alpinejs.dev) (*3.10.5*) - For adding interactivity to the pages.
- [LeaderLine](https://github.com/anseki/leader-line/) (*1.0.7*) - For drawing lines between courses.
- [CanvasConfetti](https://www.npmjs.com/package/canvas-confetti) (*1.6.0*) - For the confetti effect.
- [SASS](https://sass-lang.com) - CSS preprocessor.
- [jsDelivr](https://www.jsdelivr.com) - CDN for JS libraries.
- [Eleventy](https://www.11ty.dev) - Static site generator.
- [Python](https://www.python.org) (and lots of manual data entry).

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

### Installation & Building

1. Clone the repository.
2. Install Python dependencies with `pip install -r requirements.txt`. (If you don't have python, install it [here](https://www.python.org/downloads/))
3. Install JS dependencies with `npm install`. (If you don't have npm, install it [here](https://www.npmjs.com/get-npm))
4. `npm build` to build the project to the `docs` folder.
5. `npm start` to run the project locally. This should watch for changes and rebuild the project automatically.

### Structure

```bash
malla-fcfm/
├─ docs/
├─ src/
│  ├─ css/  # Compiled CSS, do not edit directly
│  ├─ data/
│  │  ├─ raw/       # Raw course data
│  ├─ {xyz}.json    # Processed malla+course data
|  ├─ degrees.json  # List of degrees
|  ├─ settings.json # Dropdown settings
|  ├─ process.py    # Script to process raw data
|  ├─ scrape.py     # Script to get data from UCampus
│  ├─ images/     # Images and icons
│  ├─ includes/
│  │  ├─ {name}.njk    # Reusable components
│  │  ├─ base.njk       # Base page template
│  │  ├─ malla.njk      # Malla page template
│  ├─ js/
│  │  ├─ malla.js   # JS for mallas
│  │  ├─ page.js    # JS for all pages
│  ├─ scss/
│  │  ├─ abstracts/  # Colors, mixins, sizes
│  │  ├─ base/       # Base styles
│  │  ├─ components/ # Reusable components
│  │  ├─ layout/     # Page layout
│  │  ├─ main.scss   # Main stylesheet
│  ├─ {xyz}.njk     # Mallas
│  ├─ index.njk     # Homepage
├─ .eleventy.js    # Eleventy config
├─ package.json    # Project dependencies and scripts
├─ README.md       # You are here!
```

### Contributing data

-- TODO --

### Contributing code

**HTML:** All the HTML is rendered by Eleventy using the [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) templating engine.

**Styles:** The project uses [SASS](https://sass-lang.com). I'd recommend you set it up so it watches the `.scss` files automatically. I use [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) for VSCode.

**Code formatting:** The project's HTML, CSS and JS is generally formatted with [Prettier](https://prettier.io). I'd recommend you set it up so it formats the files automatically. I use [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VSCode.

**Before comitting code:**

1. Run `npm run clean:windows` or `npm run clean:linux` to clean the `docs` folder, depending on your OS (macOS can just use `npm run clean:linux`).
2. Run `npm run build` to build the project.
3. If you added any python dependencies, run `pipreqs . --encoding=utf8 --force` to update the `requirements.txt` file.
4. Make your pull request. Try to describe everything you did (and the reasoning behind it) as best as you can.

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

- [x] Change to Static Generation v/s SPA with Alpine:
  - [x] Change to NPM package.
  - [x] Install Eleventy.
  - [x] Refactor mallas to statically generate.
  - [x] Make 404 redirect to simulate case insensitive URL.
- [x] JS/HTML/CSS contribution documentation.
  - [x] Folder/file structure documentation.
- [ ] Data contribution documentation.
- [x] Check load times and accesibility data.
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
