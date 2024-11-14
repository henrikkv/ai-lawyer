"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_server_1 = require("json-server");
const server = json_server_1.default.create();
const router = json_server_1.default.router('db.json');
const middlewares = json_server_1.default.defaults();
server.use(middlewares);
server.get('/api/twitter/:tweetId', (req, res) => {
    const tweetId = req.params.tweetId;
    const tweet = router.db.get('twitter').find({ tweetId }).value();
    if (tweet) {
        res.json(tweet);
    }
    else {
        res.status(404).send('Not Found');
    }
});
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
//# sourceMappingURL=mock-server.js.map