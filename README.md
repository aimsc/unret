# unret - Convert parsed regular expressions to strings

**unret** takes a syntax tree generated by **ret** and converts it back to a string. 

## Installation

```bash
$ npm install unret
```

## Usage

```js
var ret   = require("ret");
var unret = require("unret");

// Parse an expression with ret
var syntaxTree = ret(/regexp/.source);

// Manipulate the syntax tree
var newTree = doSomething(syntaxTree);

// Convert the syntax tree to a string
var newExpression = unret(newTree);

// Print the new expression
console.log(newExpression);

// Create a new RegExp object
var myExp = RegExp(newExpression);

// etc, etc
```

## Limitations

Certain aspects of **ret**'s syntax tree mean that parsing an expression and then immediately converting it to a string will not return the original expression.

* Quantifier symbols - ?, +, and * - are expanded to {min,max} quantifiers
* Character class escapes - \w, \d, etc - are expanded to the equivalent character class, e.g. [_a-zA-Z0-9]
* Escaped characters - \n, \u0065, etc - are expanded to the equivalent character.

In these cases, **unret** does not attempt to guess the original notation or take an opinion on which is preferable. So long as **ret** is generating a syntax tree equivalent to the original expression, the string returned by **unret** should represent an equivalent expression.

In all cases, once a **ret** tree has been converted to a string by **unret**, parsing it with **ret** and again converting to a string (however many times) should yield the first string returned, i.e. a fixed point is reached.