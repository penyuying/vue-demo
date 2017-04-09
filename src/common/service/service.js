export default {

    install(Vue, voptions) {
        voptions = voptions || {};

        function RequestHeader(options) {
            this.serviceCode = options.serviceCode;
            if (options.mobile) {
                this.mobile = options.mobile || '';
            }
        }

        function packRequest(body, header) {
            return JSON.stringify({
                requestHeader: header,
                requestBody: body
            });
        }

        Vue.prototype.S_http = {
            post(body, service, transCode, config) {
                var header,
                    request,
                    _header,
                    regexp = new RegExp(String.fromCharCode(9) + '|\\\\t|\\\t|\\t|\t', 'g');
                let v = new Vue();
                if (!service) {
                    return;
                }
                (function() {
                    if (body instanceof Object) {
                        for (var item in body) {
                            if (typeof body[item] === 'number') {
                                body[item] = body[item] + '';
                            }
                            if (typeof body[item] === 'string') {
                                body[item] = body[item] && body[item].replace(regexp, ' ') || body[item];
                            }
                        }
                    }
                })();

                _header = {
                    serviceCode: service,
                    transCode: transCode
                };
                // if (softTerminalId) {
                //     _header.softTerminalId = softTerminalId;
                // }
                header = new RequestHeader(_header);
                request = packRequest(body || {}, header);
                config = config || {};
                config.serviceCode = service;
                // return $http.post(baseUrl, request, config);
                // return $http.get(baseUrl, {
                //     // headers: {'Accept': 'application/octet-stream'},
                //     params:{"request":encodeURI(request)}
                // });
                config.params = {
                    request: encodeURI(request)
                };
                return v.$http.get(voptions.url || '/api/service.json', config);
            }
        };
    }
};