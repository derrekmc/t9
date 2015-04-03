var assert = require('assert');
var request = require('request');
var bluebird = require('bluebird');
var t9 = require('../t9');

describe('t9 RESTful-API test suite', function(test){

    this.timeout(2000);

    it('Tested loading of english dictionary', function(done){
        t9.loadDictionary('english', __dirname + '/../english.dict', function(err){
            assert(err === null || err === undefined, 'Dictionary did not load correctly: ' + err);
            done();
        });
    });

    it('Tested selection of default dictionary', function(done){
        t9.selectDictionary('default', function(err){
            assert(err === null || err === undefined, "Dictionary selection wasn't chosen correctly: " + err);
            done();
        });
    });

    it('Tested selection of english dictionary', function(done){
        t9.selectDictionary('english', function(err){
            assert(err === null || err === undefined, "Dictionary selection wasn't chosen correctly: " + err);
            done();
        });
    });

    it('Tested single numberical input to word output, auto select option 0', function(done){

        var input = 2;
        var option = 0;

        assert(input !== null, 'No input specified.');
        assert(option !== null, 'No option specified.');

        t9.processNumericInput(input, function(err, words){
            assert(err !== null || err !== undefined, 'Error: ' + err);
            var output = {
                word: words[option],
                words: words
            }
            done();
        });

    });

    it('Tested multi numberic input numbers 78777473 and expect the word output supprise, auto select option 0', function(done){

        var input = 78777473;
        var option = 0;

        assert(input !== null, 'No input specified.');
        assert(option !== null, 'No option specified.');

        t9.processNumericInput(input, function(err, words){
            assert(err !== null || err !== undefined, 'Error: ' + err);
            var output = {
                word: words[option],
                words: words
            }
            var expectedOutput = {
                word: 'supprise',
                words: [
                    "supprise",
                    "surprise"
                ]
            }
            assert.deepEqual(output, expectedOutput, 'Expected output is a mismatch');
            done();
        });

    });

    it('Tested multi numberic input numbers 78777473 and expect the word output suprise, auto select option 1', function(done){

        var input = 78777473;
        var option = 1;

        assert(input !== null, 'No input specified.');
        assert(option !== null, 'No option specified.');

        t9.processNumericInput(input, function(err, words){
            assert(err !== null || err !== undefined, 'Error: ' + err);
            var output = {
                word: words[option],
                words: words
            }
            var expectedOutput = {
                word: 'surprise',
                words: [
                    "supprise",
                    "surprise"
                ]
            }
            assert.deepEqual(output, expectedOutput, 'Expected output is a mismatch');
            done();
        });

    });

    it('Tested multiple numberical inputs and expect word output, auto select option 0', function(done){

        var input = 78777473;
        var option = 0;

        assert(input !== null, 'No input specified.');
        assert(option !== null, 'No option specified.');

        t9.processNumericInput(input, function(err, words){
            assert(err !== null || err !== undefined, 'Error: ' + err);
            var output = {
                word: words[option],
                words: words
            }
            var expectedOutput = {
                word: 'supprise',
                words: [
                    "supprise",
                    "surprise"
                ]
            }
            assert.deepEqual(output, expectedOutput, 'Expected output is a mismatch');
            done();
        });

    });

    it('Tested multiple numberical inputs and expect word output, auto select option 1', function(done){

        var input = 4433;
        var option = 1;

        assert(input !== null, 'No input specified.');
        assert(option !== null, 'No option specified.');

        t9.processNumericInput(input, function(err, words){
            assert(err !== null || err !== undefined, 'Error: ' + err);
            var output = {
                word: words[option],
                words: words
            }
            var expectedOutput = {
                word: 'hide',
                words: [
                    "gied",
                    "hide",
                    "ghee"
                ]
            }
            assert.deepEqual(output, expectedOutput, 'Expected output is a mismatch');
            done();
        });

    });

});