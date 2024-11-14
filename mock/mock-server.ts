import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/api/twitter/:tweetId', (req, res) => {
  const tweetId = req.params.tweetId;
  const tweet = router.db.get('twitter').find({ tweetId }).value();
  if (tweet) {
    res.json(tweet);
  } else {
    res.status(404).send('Not Found');
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});