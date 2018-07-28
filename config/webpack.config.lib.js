var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin')

var libPath = path.resolve(__dirname, '..', 'redux-backup');

module.exports = {
	entry: path.join(libPath, 'src', 'index.ts'),
	output: {
		path: path.resolve(libPath, 'dist/'),
		filename: 'index.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../README.md'),
			to: path.join(__dirname, '..', 'redux-backup', 'README.md')
		}]),
	],
	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React'
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDOM'
		},
		'redux': {
			commonjs: 'redux',
			commonjs2: 'redux',
			amd: 'redux',
			root: 'Redux'
		}
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}