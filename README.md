# React Timelines

Original repo: [react-timelines (JSainsburyPLC)](https://github.com/JSainsburyPLC/react-timelines).

[**Demo**](https://nicholasgriffintn.github.io/react-timelines/)

## Install

```sh
npm install react-timelines-updated
```

Feel free to replace `npm` with whatever package manager you are using.

## Use

```js
import Timeline from 'react-timelines-updated'

const MyWidget = () => <Timeline {...props} />

export default MyWidget
```

## Styling

### Using Webpack

Using Webpack with CSS loader, add the following:

```js
import 'react-timelines-updated/lib/css/style.css'
```

### Using Sass (SCSS)

Using Sass you can configure the timeline with variables:

```scss
$react-timelines-font-family: MaryAnn;
$react-timelines-sidebar-width: 320px;

@import '~/react-timelines-updated/src/scss/style';
```

### Without build tools

Create a CSS file with the contents of `react-timelines-updated/lib/css/style.css` and include it in `<head>`

## Development

```sh
npm install
npm run watch
```

This library is developed using VSCode - opening it in VSCode will recommend extensions, and enable linting and auto-formatting of code.
