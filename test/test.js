var should = require('chai').should(),
	ret	= require('ret'),
    unret = require('../index.js');

describe('#atoms', function () {
	it('handles literal characters', function () {
		var r = 'abcde12345';
		unret(ret(r)).should.equal(r);
	});

	it('handles start/end positions', function () {
		var r = '^abcde$';
		unret(ret(r)).should.equal(r);
	});

	it('handles word boundaries', function () {
		var r = '\babcde\B';
		unret(ret(r)).should.equal(r);
	});

	it('handles back-references', function () {
		var r = '\\1\\2\\3\\4\\5\\6\\7\\8\\9';
		unret(ret(r)).should.equal(r);
	});

	it('handles character classes', function () {
		var r = '[abcde]';
		unret(ret(r)).should.equal(r);
	});

	it('handles character ranges', function () {
		var r = '[a-zA-Z0-9]';
		unret(ret(r)).should.equal(r);
	});

	it('handles negated character classes', function () {
		var r = '[^abczA-Z0-9]';
		unret(ret(r)).should.equal(r);
	});
});

describe('#quantifiers', function () {
	it('handles {min,max}', function () {
		var r = "x{17,23}";
		unret(ret(r)).should.equal(r);
	});

	it('handles {min,}', function () {
		var r = "y{17,}";
		unret(ret(r)).should.equal(r);
	});

	it('handles {,max}', function () {
		var r = "y{,23}";
		unret(ret(r)).should.equal(r);
	});

	it('handles *', function () {
		var r = "x*",
			s = "x{0,}";
		unret(ret(r)).should.equal(unret(ret(s)));
	});

	it('handles +', function () {
		var r = "y+",
			s = "y{1,}";
		unret(ret(r)).should.equal(unret(ret(s)));
	});

	it('handles ?', function () {
		var r = "z?",
			s = "z{0,1}";
		unret(ret(r)).should.equal(unret(ret(s)));
	});
});

describe('#groups', function () {
	it('handles capturing groups', function () {
		var r = "a(bcd)e";
		unret(ret(r)).should.equal(r);
	});

	it('handles non-capturing groups', function () {
		var r = "a(?:bcd)e";
		unret(ret(r)).should.equal(r);
	});

	it('handles followed-by', function () {
		var r = "ab(?=cd)e";
		unret(ret(r)).should.equal(r);
	});

	it('handles not-followed-by', function () {
		var r = "ab(?!cd)e";
		unret(ret(r)).should.equal(r);
	});

	it('handles nested groups', function () {
		var r = "(a(?:b)(?=c)(?!d)e)";
		unret(ret(r)).should.equal(r);
	});
});

describe('#alternatives', function () {
	it('handles top-level alternatives', function () {
		var r = "ab|c|de";
		unret(ret(r)).should.equal(r);
	});

	it('handles grouped alternatives', function () {
		var r = "(a|b)c(d|e)";
		unret(ret(r)).should.equal(r);
	})
});