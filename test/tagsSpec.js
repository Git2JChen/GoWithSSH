/* ===================================== */
// How to run these test with Mocha?
// ---------------------------------
// 1. Navigate to D:\NodeJsTutorial\Tutsplus
// 2. run "mocha" at PowerShell command prompt
/* ===================================== */

var expect = require("chai").expect;
var tags = require("../lib/tags.js");

describe("Tags", function(){
	describe("#parse()", function(){
		it("should parse long format tags", function(){
			var args = ["--depth=4", "--hello=world"];
			var results = tags.parse(args);

			expect(results).to.have.a.property("hello", "world");
		});

		it("should add and convert number", function(){
			var args = ["--depth=4"];
			var results = tags.parse(args);

			expect(results).to.have.a.property("depth", 4);
		});		

		it("should fallback to defaults", function(){
			var args = ["--depth=4", "--hello=world"];
			var defaults = {depth: 2, foo: "bar"};
			var results = tags.parse(args, defaults);

			var expected = {
				depth: 4,
				foo: "bar",
				hello: "world"
			};

			expect(results).to.deep.equal(expected);
		});

		it("should accept tags without values as a bool", function(){
			var args = ["--searchContents"];
			var results = tags.parse(args);

			expect(results).to.have.a.property("searchContents", true);
		});

		it("should accept short formed tags", function(){
		    var args = ["-sd=4", "-h"];
		    var replacements = {
		        s: "searchContents",
		        d: "depth",
		        h: "hello"
		    };
		 
		    var results = tags.parse(args, {}, replacements);
		 
		    var expected = {
		        searchContents: true,
		        depth: 4,
		        hello: true
	    	};
 
		    expect(results).to.deep.equal(expected);
		});


	});

	describe("#addall()", function(){
		it("should add all ", function(){
			var args = ["(1 + 3) + 13 * (1 + 1)"];
			var results = tags.add_all(args);

			expect(results).to.equal(30);
		});		
	});
});