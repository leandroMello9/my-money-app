const webPack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    //Porta de Entrada da aplicação // Primeiro arquivo a ser carregado
    entry : './src/index.jsx',
    //Saida
    output : {
        path : __dirname + '/public',
        filename: './app.js'
    },
    //Servidor do Sistema
    devServer : {
        //Porta da aplicação
        port : 8080,
        //Onde ele ira ler os arquivos
        contentBase : './public'
    },
    
    resolve : {
        //Extensões que serão interpretadas
        extensions : ['', '.js' , '.jsx'],
        //Apelidos para algumas pastas 
        alias : {
            //Modules = node_modules
            modules : __dirname + '/node_modules',
            jquery : 'modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
            bootstrap : 'modules/admin-lte/bootstrap/js/bootstrap.js'
        }
    },
    plugins : [
        //Jquery
        new webPack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery',
            'window.jQuery' : 'jquery'

        }),
        //Todos os arquivos css que serão carregados
        new ExtractTextPlugin('app.css')
    ],

    module : {
        loaders : [{
            //Arquivos que terminam com JSX
            test : /.js[x]?$/,
            loader : 'babel-loader',
            //Excluindo a pasta node_modules ja que não é preciso algum tipo de parse
            exclude : '/node_modules/',
            //Presets
            query : {
                presets : ['es2015','react'],
                //Operados spread 
                plugins : ['transform-object-rest-spread']

            }

        },{
            //Arquivos CSS
            test : /\.css$/,
            loader : ExtractTextPlugin.extract('style-loader','css-loader')
        }, {
            //Arquivos de fonte de Imagens
            test : /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            loader : 'file'
        }]
    }
    

}