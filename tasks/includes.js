/*
 * grunt-includes-basic
 * Copyright (c) 2013 Anton Kudris
 *
 *
 * Based on grunt-includes https://github.com/vanetix/grunt-includes
 * Copyright (c) 2013 Matt McFarland
 *
 */

module.exports = function( grunt ) {

    var path          = require( 'path' );
    var defaultRegexp = /^\s*include\s+"(\S+)"\s*$/;


    grunt.registerMultiTask( 'includes', 'Include other files within files.', function () {

        // Default options
        var opts = this.options({
            debug        : false,
            duplicates   : true,
            includeRegexp: defaultRegexp
        });

        var sources = this.data.files.src;
        var dest    = this.data.files.dest;

        if ( sources.length === 0 ) {
            return;
        }

        sources = sources.filter( function ( p ) {

            if ( grunt.file.exists( p ) ) {

                return true;

            } else {

                grunt.log.warn('Source file "' + p + '" not found.');
                return false;
            }

        });


        if ( sources.length > 1 && grunt.file.isFile( dest ) ) {

            grunt.log.warn( 'Source file cannot be more than one when dest is a file.' );
        }


        for ( var i = 0, iLen = sources.length; i < iLen; i++ ) {

            var outFile = grunt.file.isFile( dest )
                            ? dest
                            : path.join( dest, sources[ i ] );

            grunt.file.write( outFile, recurse( sources[ i ], opts ) );
        }

    });

   /**
    * Returns the comment style for file `p`
    *
    * @param {String} p
    * @return {String}
    */
    function commentify( file, msg ) {

        var comments;
        var ext = path.extname( file ).slice( 1 );

        // js would be default
        comments = {
            js: "/* %s */",
            css: "/* %s */",
            html: "<!-- %s -->"
        };

        return ( comments[ ext ] || comments.js ).replace( /%s/g, msg );
    }

   /**
    * Helper for `includes` builds all includes for `p`
    *
    * @param {String} p
    * @return {String}
    */
    function recurse ( p, opts, included ) {

        var src, next, match, error;

        included = included || [];

        if ( ! grunt.file.isFile( p ) ) {

            grunt.log.warn( 'Included file "' + p + '" not found.' );
            return commentify( p, 'Include failed, file not found : "' + p + '".' );
        }

        // If `opts.duplicates` is false and file has been included, error
        if ( ! opts.duplicates && ~included.indexOf( p ) ) {

            error = 'Duplicate include: ' + p + ' skipping.';
            grunt.log.error( error );

            if ( opts.debug ) {
                return commentify( p, error );
            } else {
                return '';
            }
        }

        // At this point the file is considered included
        included.push( p );

        // Split the file on newlines
        src = grunt.file.read( p ).split( grunt.util.linefeed );

        // Loop through the file calling `recurse` if an include is found
        var compiled = src.map( function ( line ) {

            match = line.match( opts.includeRegexp );

            // If the line has an include statement, recurse
            if ( match ) {

                next = path.join( path.dirname( p ), match[ 1 ] );

                line = recurse( next, opts, included );

                // Include debug comments if `opts.debug`
                if ( opts.debug ) {

                    line = commentify( p, 'Begin: ' + next ) +
                            '\n' + line + '\n' + commentify( p, 'End: ' + next );
                }
            }

            return line;
        });

        return  compiled.join( grunt.util.linefeed );
    }

};
