var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

"use strict";

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
                dictionaries[dictionaryName] = contents.toString().toLowerCase().split('\n');
                if(self.dictionaryName == 'default'){
                    self.dictionaryName = dictionaryName;
                }
                callback(null,  self.dictionaryName);
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

    processNumericInput: function processNumericInput(input, callback) {
        var self = this;
        var numberList = input.toString().split('');
        var tempDictionary = dictionaries[this.dictionaryName];
        var output = [];
        

        if(numberList.length === 1){
            output = numericDictionaryMap[input];
        }else{
            numberList.map(function(number, wordsLetterIndex){
                self.narrowDictionaryOnInput(numberList, number, wordsLetterIndex, tempDictionary, function(narrowedDictionary, newNumberList){
                    tempDictionary = narrowedDictionary;
                    output = tempDictionary;
                });
            });
        }
        
        //Limit our list to 100
        output = output.slice(0, 100); 
        
        if(output == '') {
            throw(Error('No words found in dictionary(' + this.dictionaryName + ') that match the input: ' + input + output));
        }else{
            callback(null, output);
        }

    },

    narrowDictionaryOnInput: function narrowDictionaryFromInput(numbers, nextNumber, wordsLetterIndex, dictionary, callback){
        var output = [];
        numericDictionaryMap[nextNumber].map(function(letter){
            dictionary.map(function(word, i){
                if(word[wordsLetterIndex] == letter && word.length === numbers.length){
                    output.push(word);
                }
            });
        });
        callback(output);
    }
}
module.exports = Promise.promisifyAll(t9);