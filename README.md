# react-pdfjs-dist
A react library to render pdf document in html

<p>
  <a href="https://www.npmjs.com/package/react-pdfjs-dist">
    <img src="https://badge.fury.io/js/react-pdfjs-dist.svg" alt="npm version" height="18">
  </a>
  <a href="https://www.npmjs.com/package/react-pdfjs-dist">
    <img src="https://img.shields.io/npm/dw/react-pdfjs-dist" alt="Downloads">
  </a>
  <a href="https://paypal.me/praveenkumarkalidass?locale.x=en_GB">
    <img src="https://img.shields.io/badge/paypal-donate-red" alt="Paypal">
  </a>
</p>

## Install

Install the component using [NPM](https://www.npmjs.com/):

```sh
$ npm install --save react-pdfjs-dist
```

Install the component using [YARN](https://yarnpkg.com):

```sh
$ yarn add react-pdfjs-dist
```

## Usage

```js
import React, { useEffect, useRef } from 'react';
import { useReactPdf } from 'react-pdfjs-dist';

const App = () => {
  const ref = useRef(null);
  const { renderPdf } = useReactPdf({ containerRef: ref });

  useEffect(() => {
    renderPdf('http://localhost:3000/sample_document.pdf');
  }, [renderPdf]);

  return (
    <div className="App">
      <div className="pdf-container" ref={ref} />
    </div>
  );
}
```

## License

[MIT License](http://opensource.org/licenses/MIT)
