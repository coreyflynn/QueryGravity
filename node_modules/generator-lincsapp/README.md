# generator-lincsapp [![Build Status](https://secure.travis-ci.org/coreyflynn/generator-lincsapp.png?branch=master)](https://travis-ci.org/coreyflynn/generator-lincsapp)

A [Yeoman](http://yeoman.io) generator for LINCS webapps.


## Getting Started

### How do I use this thing?

This is a [yeoman](http://yeoman.io) generator, so you need to have [yeoman](http://yeoman.io) installed.  Head over to  [yeoman](http://yeoman.io)

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.  This generator sets you up with a shiny new template LINCS web application along with fun things like an auto-updating dev enviroment.

To install generator-lincsapp from npm, run:

```
$ npm install -g generator-lincsapp
```

next make a folder to hold your webapp and run the following to initiate the generator in that folder:

```
$ yo lincsapp
```

yeoman will ask you a few questions to set up your app and install dependencies for the dev environment.  To see your new app in action run:

```
$ grunt
```

with that up and running, modify the file at:

```
views/index.jade
```

to grow your app and watch it take shape with live updates!




## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
