# PostCSS Themeize [![Build Status][ci-img]][ci]

[PostCSS] plugin walks through rules and and creates themed rules according to config.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ac-amygdala/postcss-themeize.svg
[ci]:      https://travis-ci.org/ac-amygdala/postcss-themeize

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-themeize') ])
```

See [PostCSS] docs for examples for your environment.
