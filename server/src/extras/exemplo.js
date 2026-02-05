// Load tokenizer.
var tokenizer = require( 'wink-tokenizer' );

// Create it's instance.
var myTokenizer = tokenizer();

// Tokenize a tweet.
var codigo = '@superman: hit me up on my email r2d2@gmail.com, 2 of us plan party🎉 tom at 3pm:) #fun';
myTokenizer.tokenize(codigo);