var ret = require("ret");

// lookup table parameterised by ast node type
var stringBuilders = {};	

stringBuilders[ret.types.GROUP] = function (node) {
	var disjunction = stackOrOptions(node);

	var prefix = ""
	if(! node.remember) {
		if (node.followedBy) {
			prefix = "?="
		}
		else if (node.notFollowedBy) {
			prefix = "?!"
		}
		else {
			prefix = "?:"
		}
	}

	return "(" + prefix + disjunction + ")"
}

stringBuilders[ret.types.POSITION] = function (node) {
	return node.value;
}

stringBuilders[ret.types.SET] = function (node) {
	var prefix = node.not ? "^" : "";
	var classRanges = stackString(node.set);

	return "[" + prefix + classRanges + "]";
}

stringBuilders[ret.types.RANGE] = function (node) {
	var first = String.fromCharCode(node.from);
	var last = String.fromCharCode(node.to);

	return first + "-" + last;
}

stringBuilders[ret.types.REPETITION] = function (node) {
	var atom = buildString(node.value);
	var quantifier = ""

	if(node.max == Infinity) {
		quantifier = "{" + node.min + ",}";
	}
	else if(node.max == node.min) {
		quantifier = "{" + node.min + "}";
	}
	else {
		quantifier = "{" + node.min + "," + node.max + "}";
	}

	return atom + quantifier;
}

stringBuilders[ret.types.REFERENCE] = function (node) {
	return "\\" + node.value;
}

stringBuilders[ret.types.CHAR] = function (node) {
	return String.fromCharCode(node.value);
}

var buildString = function (astNode) {
	return stringBuilders[astNode.type](astNode);
}

var stackString = function (items) {
	var atoms = [];

	for (var i = 0; i < items.length; i++) {
		atoms.push(buildString(items[i]));
	}

	return atoms.join("");
}	

var stackOrOptions = function (node) {

	// .stack => node contains a sequence of terms
	if (node.stack) {
		return stackString(node.stack)
	}
	// .options => node contains a set of alternatives
	else if (node.options) {
		var alternatives = [];
		for (var i = 0; i < node.options.length; i++) {
			alternatives.push(stackString(node.options[i]))
		}
		return alternatives.join("|");
	}
}

var astToString = function (root) {
	return stackOrOptions(root);
}

module.exports = astToString