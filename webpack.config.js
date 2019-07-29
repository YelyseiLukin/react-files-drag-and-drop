const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const yaml = require('js-yaml');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = function () {
    const ENV = process.env.ENV || 'local';

    console.log('ENV:', ENV);
    const isLocal = ENV === 'local';
    const isProd = !isLocal;

    const env = yaml.safeLoad(fs.readFileSync(`env/${ENV}.yml`)) || {};

    const plugins = [
        new CleanWebpackPlugin(),

        new StyleLintPlugin({
            failOnErrors: true,
            context: path.join(srcPath, 'scss'),
        }),

        new webpack.ProvidePlugin({
            $: 'jquery/dist/jquery.slim',
            jQuery: 'jquery/dist/jquery.slim',
        }),

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            ENV,
            ...env,
        }),

        new HtmlWebpackPlugin({
            template: 'assets/html/template.ejs',
            inject: 'body',
            data: {},
        }),

        new CopyWebpackPlugin([
            // {from: 'assets/img/favicon.ico', to: '.'},
        ]),

        new ExtractTextPlugin('[name].[hash].css'),
    ];

    if (isProd) {
        plugins.push(
            new webpack.HashedModuleIdsPlugin(),
        );
    } else {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true,
            }),
        );
    }

    const cssLoaders = ({modules = true} = {}) => ([
        {
            loader: 'css-loader',
            options: {
                modules: modules ? {
                    localIdentName: '[local]',
                } : false,
            },
        },
        {
            loader: 'sass-loader',
        },
    ]);

    let devServer = {
        contentBase: srcPath,
        port: 3000,
        disableHostCheck: isLocal,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
        },
        historyApiFallback: {
            index: '/',
        },
        watchOptions: {
            ignored: /node_modules/,
        },
    };

    return {
        mode: isLocal ? 'development' : 'production',
        devtool: isLocal ? 'eval-source-map' : 'hidden-source-map',
        context: srcPath,
        entry: {
            main: 'index.js',
        },
        output: {
            path: distPath,
            filename: '[name].[hash].js',
            publicPath: (env.CDN_BASE) || '/',
            // sourceMapFilename: 'bundle.map',
        },
        module: {
            rules: [
                // hack to fix Lodash global exporting
                {
                    parser: {
                        amd: false,
                    },
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.(png|jpe?g|gif|ttf|eot|ico|otf)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash].[ext]',
                        },
                    },
                },
                {
                    test: /\.json$/,
                    use: 'json-loader',
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'svg-url-loader',
                        options: {
                            stripdeclarations: true,
                            iesafe: true,
                            // limit: 1024,
                            noquotes: true,
                            name: '[path][name].[hash].[ext]',
                        },
                    },
                },
                {
                    test: (modulePath) => {
                        return /\.(s?css)$/.test(modulePath) && !/node_modules/.test(modulePath);
                    },
                    use: isLocal
                        ? [
                            {
                                loader: 'style-loader',
                                options: {
                                    hmr: true,
                                },
                            },
                            ...cssLoaders(),
                        ]
                        : ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: cssLoaders(),
                        }),
                },
                {
                    test: /node_modules[/\\].*\.(s?css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: cssLoaders({modules: false}),
                    }),
                },
                {
                    test: /\.(jsx?)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'eslint-loader',
                            options: {
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.json'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                srcPath,
            ],
        },

        plugins,

        performance: isProd && {
            hints: 'warning',
        },

        devServer,

        optimization: {
            namedModules: true,
        },
    };
};
