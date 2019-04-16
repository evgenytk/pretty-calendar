const prod = process.env.NODE_ENV === 'production';

const data = [
	{
		plugins: [
			require('postcss-custom-properties')({
			    'preserve': false
			}),
			require('postcss-flexbugs-fixes')
		],
		shouldInject: true
	},
	{
		plugins: [
			require('autoprefixer')({
			    'browsers': ['> 1%', 'last 2 versions']
			})
		],
		shouldInject: true
	},
	{
		plugins: [
			require('cssnano')
		],
		shouldInject: prod
	},
];

let plugins = [];

for (var i = 0; i < data.length; i++) {
	if (data[i].shouldInject) {
		plugins = plugins.concat(data[i].plugins);
	}
}

module.exports = {
    plugins: plugins
}