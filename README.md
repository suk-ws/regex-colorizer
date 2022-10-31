# Regex Colorizer

A JavaScript scripts to coloring the regex pattern.

## how to use

first import the javascript & css file (you can use jsdelivr, or just download it to your own server).

```html
<link rel="stylesheets" href="https://cdn.jsdelivr.net/gh/suk-ws/regex-colorizer@master/regex-colorizer-default.min.css">

<script src="https://cdn.jsdelivr.net/gh/suk-ws/regex-colorizer@master/regex-colorizer.min.js">
```

then using the following js code after the page loaded to run coloring :

```javascript
RegexColorizer.coloringAll();
// this will coloring all the element with class name "regex",
// you can use RegexColorizer.coloringAll("your-own-regex-element-css-class"); to define a different class name.
```

## About

The coloring idea is from [RegExr](https://regexr.com/). So the coloring rule and colors is basicly the same.

> not fully the same, for one reason is it seems single `/` error is not such intelligent without js grammar,
> and the other reason is the regex grammar support is still simple for now.

There's also [a test-use page](https://book.sukazyo.cc/%root/test-regex-highlight) you can see how's the coloring result.
