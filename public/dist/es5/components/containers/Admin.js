"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var superagent = _interopRequire(require("superagent"));

var Admin = (function (Component) {
	function Admin() {
		_classCallCheck(this, Admin);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Admin, Component);

	_prototypeProperties(Admin, null, {
		componentDidMount: {
			value: function componentDidMount() {
				console.log("Admin Component Did Mount!");
				// who is logged in??
				superagent.get("/auth/currentuser").query(null).set("Accept", "application/json").end(function (err, response) {
					if (err) {
						console.log("REQUEST ERROR: " + err.message);
						return;
					}
					console.log("USER: " + JSON.stringify(response.body));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					"This is the Admin container!"
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Admin;
})(Component);

exports.Admin = Admin;
Object.defineProperty(exports, "__esModule", {
	value: true
});