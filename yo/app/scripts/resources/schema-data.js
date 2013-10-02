'use strict';

angular.module('dmpApp')
    .factory('SchemaDataResource', ['$resource', '$window', function($resource, $window) {
        var baseUrl = $window['dmp']['jsRoutes']['api']
            , endpoint = 'resources/:id/configurations/:cid/:kind';

        return $resource(baseUrl + endpoint, {
            id: '@id',
            cid: '@cid'
        }, {
            schema: {
                method: 'GET',
                params: {
                    kind: 'schema',
                    id: '@id',
                    cid: '@cid'
                },
                transformResponse: function (data, headers) {
                    if (angular.lowercase(headers('content-type')) === 'application/json') {
                        return {data: JSON.parse(data)};
                    }
                    return data;
                },
                cache: true
            },
            data: {
                method: 'GET',
                isArray: true,
                params: {
                    kind: 'data',
                    id: '@id',
                    cid: '@cid',
                    atMost: '@atMost'
                },
                cache: true
            }
        });
    }]);
