# PostCSS Themeize [![Build Status][ci-img]][ci]

[PostCSS] plugin walks through rules and and creates themed rules according to config.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ac-amygdala/postcss-themeize.svg
[ci]:      https://travis-ci.org/ac-amygdala/postcss-themeize

It uses `@your_variable` syntax to determine which css declarations should be
wrapped in theme.
It copies selectors and prepend them with theme classname
and appends all needed css properties with theme-dependent values.

```css
/* Input css */

.foo {
  color: @base_color;
  /* some other styles */
}
```

```js
/* Config with themes passed to PostCSS */

{
  themes: {
    green: {
      base_color: #00ff00;
    },
    pink: {
      base_color: rgb(255,20,147);
    }
  }
}
```

```css
/* Output css */

.foo {
  /* some other styles */
}

.green .foo {
  color: #00ff00;
}

.pink .foo {
  color: rgb(255,20,147);
}
```

## Usage

```js
postcss([ require('postcss-themeize') ])
```

See [PostCSS] docs for examples for your environment.
