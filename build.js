var metalsmith = require('metalsmith'),
	branch = require('metalsmith-branch'),
	collections = require('metalsmith-collections'),
	drafts = require('metalsmith-drafts'),
	excerpts = require('metalsmith-excerpts'),
	fileMetadata = require('metalsmith-filemetadata'),
	markdown = require('metalsmith-markdown'),
	permalinks = require('metalsmith-permalinks'),
	sass = require('metalsmith-sass'),
	serve = require('metalsmith-serve'),
	templates = require('metalsmith-templates'),
	ignore = require('metalsmith-ignore'),
	watch = require('metalsmith-watch'),
	moment = require('moment'),
	handlebars = require('handlebars'),
	hbLayouts = require('handlebars-layouts'),
	hbMoment = require('handlebars-helper-moment');

handlebars.registerHelper(hbLayouts(handlebars));
handlebars.registerHelper(hbMoment(handlebars));

var site = metalsmith(__dirname)
	.metadata({
		site: {
			'title': "Michael Clawson's blog",
			'url': 'localhost:8080'
		}
	})
	.source('./src')
	.destination('./build')
	//plugins go here
	.use(drafts())
	.use(fileMetadata([
		{pattern: 'posts/*', metadata: {'template': 'post.hbs'}}
	]))
	.use(markdown())
	.use(excerpts())
	.use(collections({
		posts: {
			pattern: 'posts/**.html',
			sortBy: 'publishDate',
			reverse: true
		}
	}))
	.use(branch('posts/**.html')
		.use(permalinks({
			pattern: 'posts/:title',
			relative: false
		}))
	)
	.use(branch('!posts/**.html')
		.use(branch('!index.html')
			.use(permalinks({
				relative: false
			}))
		)
	)
	.use(templates({
		engine: 'handlebars',
		partials: {
			'layout': 'partials/layout',
			'sidebar': 'partials/sidebar'
		},
		directory: 'src/layout'
	}))
	.use(sass({
		outputDir: 'css/'
	}))
	.use(serve({
		port: 8080,
		verbose: true
	}))
	.use(ignore('layout/**/*'))
	.use(watch({
		paths: {
			"${source}/**/*": true,
			"layout/**/*": "**/*.md"
		},
		livereload: true
	}))
	.build(function (err) {
		if (err) return console.log(err);
		console.log('Site built');
	});


