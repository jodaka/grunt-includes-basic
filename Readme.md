# grunt-includes-basic
***Requires grunt ~0.4.0***

A grunt task for including a file within another file.
*Circular* imports will break the recursive strategy.

## Getting Started
Install this grunt plugin next to your project's *Gruntfile.js* with: `npm install grunt-includes-basic --save`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-includes-basic');
```

## Options
#### includeRegexp
Type: `RegExp`

Sets the regular expression used to find *include* statements. The file path should always be the `$1`.


## Usage

You can use this plugin to build html templates.

```javascript
includes: {
  files: {
    src: ['path/to/foo.html', 'path/to/bar.html'], // Source files
    dest: 'tmp', // Destination directory
    flatten: true,
    cwd: '.'
  }
}
```


## Example
*index.html*
```html
<html>
<head>
  <title>Show me</title>
</head>
<body>
  include "content.html"
</body>
</html>
```
*content.html*
```html
<div class="content">
  <h1>Content</h1>
  <p>More content</p>
</div>
```
**Produces**
```html
<html>
<head>
  <title>Show me</title>
</head>
<body>
<div class="content">
  <h1>Content</h1>
  <p>More content</p>
</div>
</body>
</html>
```

Forked and stripped version of grunt-includes by Matt McFarland.
