require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./webpack.prod.conf') :
    require('./webpack.dev.conf')


var os = require('os');
var IPv4, hostName;
hostName = os.hostname();

var networks = os.networkInterfaces();
for (var item in networks) {
    console.log(item);
    if ((item == '本地连接' || item == 'en0' || item == 'eth0') && networks[item] && networks[item].length > 0) {
        for (var i = 0; i < networks[item].length; i++) {
            var network = networks[item];
            if (!IPv4 && network[i].family == 'IPv4') {
                IPv4 = network[i].address;
            }
        }
    }
}

console.log('----------local IP: ' + IPv4);
console.log('----------local host: ' + hostName);


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express();
var _data = require("../data.json");
var jsonData = (function() {
    var res = {};
    for (var item in _data) {
        if (_data[item] instanceof Array) {
            res[item] = {
                list: _data[item]
            }
        } else {
            res[item] = _data[item];
        }
    }

    return res;
})();

var apiRouter = express.Router();

function unRequest(data) {
    data = data.query && data.query.request && JSON.parse(decodeURI(data.query.request)) || {};

    return {
        header: data.requestHeader || {},
        body: data.requestBody || {},
    }
}

function packBody(name) {
    var _res;
    if (jsonData[name]) {
        _res = jsonData[name];
    }
    return _res;
}

var _error = {
    "E90000": {
        "returnCode": "E90000",
        "returnStatus": "0",
        "returnDesc": "服务调用失败!",
    },
    "000000": {
        "returnCode": "000000",
        "returnStatus": "1",
        "returnDesc": null,
    }
}

function getErr(code) {
    var _res;
    if (_error[code]) {
        _res = _error[code];
    } else {
        _res = {
            "returnCode": "E90000",
            "returnStatus": "0",
            "returnDesc": "未知错误!",
        }
    }
    return _res;
}



(function() {
    function getSend(request, response, serviceCode) {
        var req = unRequest(request);
        serviceCode = serviceCode || req.header.serviceCode;
        var requestBody = req.body,
            _responseBody = packBody(serviceCode);
        var _status = _responseBody && getErr("000000") || getErr("E90000");
        var _res = {
            responseHeader: {
                serviceCode: serviceCode,
                "returnCode": _status.returnCode,
                "returnStatus": _status.returnStatus,
                "returnDesc": _status.returnDesc,
                "conversationId": null,
                "accessToken": null,
                "systemDate": (new Date()).getTime()
            },
            responseBody: _responseBody || {}
        };
        response.json(_res);
    }

    apiRouter.get("/service.json", (request, response) => {
        getSend(request, response);
    });

    for (var item in jsonData) {
        apiRouter.get("/" + item, (request, response) => {
            getSend(request, response, item);
        });
    }
})();

app.use("/api", apiRouter);

app.use('/static', express.static(path.join(__dirname, '../static')));

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// var uri = 'http://localhost:' + port
var uri = 'http://' + IPv4 + ':' + port

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})