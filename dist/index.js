"use strict";

var _express = _interopRequireDefault(require("express"));

var _consign = _interopRequireDefault(require("consign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('express-debug');

var app = (0, _express.default)(); // Routes

(0, _consign.default)({
  cwd: __dirname
}).include('libs/config.js').then('db.js').then('libs/middlewares.js').then('routes').then('libs/boot.js').into(app);