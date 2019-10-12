'use strict';
const _ = require('lodash');
function attachRoutes(routes, router, corsEnabled) {
    let defaults = { type: '', path: '', handlers: [] };

    routes.forEach((route) => {
        route = _.extend(defaults, route);
        if (Object.keys(route).length !== 3)
            throw new Error('Invalid arguments in routes configuration');
        else if (typeof route.path !== 'string')
            throw new Error('Route path must be a string');
        else if (!route.handlers.every((handler) => typeof handler === 'function'))
            throw new Error(JSON.stringify(route) + ' Route handlers contain invalid handler, handlers must be functions');
        else {
            const routeMethod = {
                'POST': router.post.bind(router, route.path, route.handlers),
                'PUT': router.put.bind(router, route.path, route.handlers),
                'PATCH': router.patch.bind(router, route.path, route.handlers),
                'DELETE': router.delete.bind(router, route.path, route.handlers),
                'GET': router.get.bind(router, route.path, route.handlers),
            }[route.type];
            routeMethod();
        }
    });
    return router;
}
function routeConfig(router, routeObjects) {
    routeObjects.forEach(routeOb => {
        router = attachRoutes(routeOb.PUBLIC, router, false);
        router = attachRoutes(routeOb.PROTECTED, router, true);
    });
    return router;
}
module.exports = routeConfig;