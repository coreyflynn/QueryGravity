'use strict';
var util = require('util');
var path = require('path');
var jade = require('jade');
var fs = require('fs');
var html = '';
var yeoman = require('yeoman-generator');


var LincsappGenerator = module.exports = function LincsappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
    this.log("type 'grunt' to launch the app");
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LincsappGenerator, yeoman.generators.Base);

LincsappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'LincsApp'
  },
  {
    type: 'input',
    name: 'appDescription',
    message: 'Give me a short description of your app',
    default: 'The New Hotness'
  },
  {
    type: 'input',
    name: 'barista_key',
    message: 'Enter your Barista Key. If left blank, API calls to lincscloud.org will not work',
    default: 'I have no key'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appDescription = props.appDescription;
    this.barista_key = props.barista_key;

    cb();
  }.bind(this));
};

LincsappGenerator.prototype.buildViews = function buildViews() {
  this.sourceRoot(path.join(__dirname, 'templates', 'views'));
  this.directory('.', 'views');
  this.template('index.jade','index.jade');
}

LincsappGenerator.prototype.buildRoutes = function buildRoutes() {
  this.sourceRoot(path.join(__dirname, 'templates', 'routes'));
  this.directory('.', 'routes');
}

LincsappGenerator.prototype.buildPublic = function buildPublic() {
  this.sourceRoot(path.join(__dirname, 'templates', 'public'));
  this.directory('.', 'public');
}

LincsappGenerator.prototype.app = function app() {
  this.sourceRoot(path.join(__dirname, 'templates'));

  // copy the default app file
  this.copy('app.js','app.js')

  // copy the default Gruntfile.js to the base directory after processing
  this.template('_Gruntfile.js', 'Gruntfile.js');

  // copy the default package.json to the base directory after processing
  this.template('_package.json', 'package.json');

  // copy the default bower configuration to the base directory after processing
  this.template('_bower.json', 'bower.json');
  this.copy('.bowerrc','.bowerrc');

  // copy the default package.json to the base directory after processing
  this.template('_barista_config.json', 'public/barista_config.json');
};

LincsappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
