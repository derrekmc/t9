"use strict";

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var dictionaries = {
    default: ['hello', 'hi']
};

var numericDictionaryMap = {
    2 : ['a', 'b', 'c'],
    3 : ['d', 'e', 'f'],
    4 : ['g', 'h', 'i'],
    5 : ['j', 'k', 'l'],
    6 : ['m', 'n', 'o'],
    7 : ['p', 'q', 'r', 's'],
    8 : ['t', 'u', 'v'],
    9 : ['w', 'x', 'y', 'z']
};

var t9 = {

    dictionaryName: 'default',

    loadDictionary: function loadDictionary(dictionaryName, filename, callback) {
        var self = this;
        fs.readFileAsync(filename)
            .then(function(contents) {
                contents = contents.toString();
                dictionaries[dictionaryName] = contents.split('\r\n');
                if(self.dictionaryName == 'default'){
                    self.dictionaryName = dictionaryName;
                }
                callback();
                return;
            })
            .catch(function(err){
                callback(err);
            });
    },

    selectDictionary: function loadDictionary(dictionaryName, callback) {
        this.dictionaryName = dictionaryName;
        callback();
    },

    processNumbericInput: function processNumbericInput(input, callback) {

        var numberList = input.toString().split('');
        var tempDictionary = dictionaries[this.dictionaryName];

        var output = [];
        var self = this;

        if(numberList.length === 1){
            output = numericDictionaryMap[input];
        }else{
            numberList.forEach(function(number, wordsLetterIndex){
                self.narrowDictionaryOnInput(numberList, number, wordsLetterIndex, tempDictionary, function(narrowedDictionary, newNumberList){
                    tempDictionary = narrowedDictionary;
                    output = tempDictionary;
                });
            });
        }

        if(output == '') {
            throw(Error('No words found in dictionary(' + this.dictionaryName + ') that match the input: ' + input));
        }else{
            callback(null, output.slice(0, 400));
        }

    },

    narrowDictionaryOnInput: function narrowDictionaryFromInput(numbers, nextNumber, wordsLetterIndex, dictionary, callback){
        var output = [];
        numericDictionaryMap[nextNumber].forEach(function(letter){
            dictionary.forEach(function(word){
                if(word[wordsLetterIndex] == letter && word.length === numbers.length){
                    output.push(word);
                }
            });
        });
        callback(output);
    }
}
module.exports = Promise.promisifyAll(t9);