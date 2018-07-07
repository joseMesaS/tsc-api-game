"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const dbs_1 = require("./dbs");
const controller_1 = require("./games/controller");
const app = routing_controllers_1.createKoaServer({
    cors: true,
    controllers: [controller_1.default]
});
dbs_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map