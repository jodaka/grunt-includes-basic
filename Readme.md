# grunt-includes-basic
Don't use this module. Use grunt-includes instead

```




































```


### Here be dragons

Don't even try stuff like:
```
npm install grunt-includes-basic
```
You've been warned.
And stuff like this would curse your Gruntfile and kill you cat.
```
includes: {

            jsConfig: {

                options: {

                    includeRegexp: /\s*\/\/\s*@include\s"(\S+)"\s*$/,
                    duplicates: false,
                    debug: true

                },

                files: {
                    src : [ 'file-that-badly-needs-includes.js' ],
                    dest: '.'
                }

            }

        }
```

As you may have guessed, this wouldn't allow you to write in your ```.js``` bad things, like:
```
// @include "some-other-file.js"
```
