# BPPM

Production: [www.bppm.fr](https://www.bppm.fr)

## Coding conventions

### React naming convention:

#### Ordering files

- Import React is everytime first
- Package imports ordered alphabetically by package name
- //
- Local imports ordered alphabetically by import name (multiple imports through ES6 object deconstruction not allowed to keep ordering consistant)

_Note: if use less than 3 const from props, constants can be defined in the function parameters_

- const from props
- const from context
- //
- const from useState
- //
- const from useRef
- //
- const defined in the function
- //
- useEffect ordered by first variables
- //
- return element
- //
- functions (no arrows function) ordered by name (A to Z)

### SCSS naming convention:

- Component__Element--Modifier
- Component-Name__Element-Name--Modifier-State

Source: [BEM — Block Element Modifier](http://getbem.com/)

#### Colors:

- color__alpha = primary
- color__beta = secondary
- color__gamma = background
- color__psi = text
- color__omega = white

Source: [Alpha, Beta, Gamma naming convention](https://www.silvestar.codes/articles/alpha-beta-gamma-naming-convention/)

---

#### Ordering CSS:
- Layout Properties (position, float, clear, display)
- Box Model Properties (width, height, margin, padding)
- Visual Properties (color, background, border, box-shadow)
- Typography Properties (font-size, font-family, text-align, text-transform)
- Misc Properties (cursor, overflow, z-index)

Source: [“Outside In” — Ordering CSS Properties by Importance](https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)

---

#### Media queries in Sass

[Library @include-media](https://include-media.com)