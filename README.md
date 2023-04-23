# eclair-lang.org

This repository contains the code for the
[eclair-lang](https://github.com/luc-tielen/eclair-lang) website.
The website can be found [here](https://eclair-lang.org).

## Useful commands

Look at the `scripts` key in the `package.json` for a list of the most common
commands. These commands can be invoked with `npm run $NAME_OF_COMMAND`

## Developer setup

Run the following commands once initially.

```bash
$ git submodule update --init --recursive
$ cd build && npm run build && cd -
```

Afterwards, you can run `npm run dev` to start working on the site.
