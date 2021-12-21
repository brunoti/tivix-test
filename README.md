# Tivix Test

An api that serves games for ya

## Installation

```bash
yarn
```

## Usage

###### Copy the .env.exemple for your own:
```bash
cp .env.example .env
```

###### Add the following credentials:
```env
TWITCH_CLIENT_ID=1vlsu8k7ng5araqp3x0xddwv6xyi7s
TWITCH_SECRET=nbtswcwo422ng9jlrl9cqub1uoitbp
```

###### The port defaults to 3000 but you can change it on your env if you need:
```env
PORT=4500
```

###### Then you can run the project:
```sh
yarn start:dev
```

###### Test it out!:
```sh
curl http://localhost:4500/games?page=1&size=100
curl http://localhost:4500/games?page=1&search=Tekken
```

###### If you have jq:
```sh
curl http://localhost:4500/games?page=1&size=10&search=street%20fighter | jq '.[].name'
```

## Todo
- [ ] Improve error handling
- [ ] Add database to save favorite games
- [ ] Improve coverage
- [ ] Add security, at least a client token or jwe with expiration time

## License
[MIT](https://choosealicense.com/licenses/mit/)
