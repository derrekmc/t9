var express = require('express');
var router = express.Router();
var t9 = require('./t9')

t9.loadDictionaryAsync('english', __dirname + '/english.dict')
    .then(function(){
        console.log('Dictionary Loaded');
        router.get('', function(req, res, next) {
            var input = req.param('input');
            
                console.log('t9 API received:', input);
                t9.processNumericInputAsync(input)
                    .then(function(words){
                        console.log('t9 API word combination response:', words);
                        res.send({
                            word: words[(req.param('option') || 0)],
                            words: words
                        });
                    })
                    .catch(function(e) {
                        console.warn(e);
                        res.send({
                            error: e.toString()
                        });
                    });
            
        });
    });

module.exports = router;