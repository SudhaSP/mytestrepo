module.exports = function (grunt) {
    var date = new Date();
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'md-docs/*.md',
                        dest: 'html-docs',
                        ext: '.html'
                    }
                ],
                options :{
                    template: 'layout/template.html',
                    templateContext : {
                        date :  date.getFullYear() + "-" + date.getMonth()
                    },
                    markdownOptions: {
                        gfm: true,
                        breaks: true
                    }    
                }
            }
        },
        
        sass:{
            dist:{
                files : {
                'layout/toc.css':'layout/toc.scss'
                }
            }
        },
        
        watch: {
            sass:{
                files : ['layout/toc.scss'],
                tasks : ['sass']
            },
            docs: {
                files: ['md-docs/*.md'],
                tasks: ['markdown'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.registerTask('serve', [ "connect", 'watch' ]);


    
}