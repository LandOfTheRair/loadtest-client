# Land of the Rair Load Testing Client

These bots are dumb. They'll sit in an area and attack. If you give them the right items, they won't die. This setup is also pretty jank, but it works.

## Running Bots

Run `npm start -- --clients 1 --register --password testpasswordlol` to hit your dev instance. Run it with `--prod` to hit prod.

You can specify the number of clients with `--clients`.

First, you must make them `--register`, but after they've registered you can rerun it without that arg.

`--password` is optional, but recommended.

It'll take a few tries to get them in game, but once you get them in game, they will `trade enable` themselves. You can give them a `Bot Unkillable Saber` and they'll go to town wherever they land. You should `@send` them somewhere to test them. It may require a few tries to get them to load in correctly, though.
