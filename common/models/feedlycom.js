'use strict';

//Config
  var configJson = process.cwd() + '/' + "config.json";
  var config = require(configJson);

module.exports = function(Feedlycom) {
	
    //List all categories

        Feedlycom.listAllFeedPipes = function(data, cb) {
	      
	      var response = "msg from listAllFeedPipes";

              cb(null, response);
        }

        Feedlycom.remoteMethod('listAllFeedPipes', {
              http: {path: '/listAllFeedPipes', verb: 'get'},
              accepts: {arg: 'data', type: 'object', http: { source: 'body' }},
              returns: {arg: 'response', type: 'object', 'http': {source: 'res'}}
        });

	
    //List all boards

        Feedlycom.listAllBoardPipes = function(data, cb) {
	      
	      var response = "msg from listAllBoardPipes";

              cb(null, response);
        }

        Feedlycom.remoteMethod('listAllBoardPipes', {
              http: {path: '/listAllBoardPipes', verb: 'get'},
              accepts: {arg: 'data', type: 'object', http: { source: 'body' }},
              returns: {arg: 'response', type: 'object', 'http': {source: 'res'}}
        });


    //Search in category feed

        Feedlycom.searchInFeedPipe = function(streamId, query, fields, cb) {
	      
	      var response = "msg from searchInFeedPipe --Fields: " + fields;

              cb(null, response);
        }

        Feedlycom.remoteMethod('searchInFeedPipe', {
              http: {path: '/searchInFeedPipe', verb: 'get'},
              accepts:[ 
			{ arg: 'streamId', type: 'string' },
			{ arg: 'query', type: 'string' },
			{ arg: 'fields', type: 'string' }
	      ],
              returns: {arg: 'response', type: 'object', 'http': {source: 'object'}}
        });


	
    //Search in board feed

        Feedlycom.searchInBoardPipe = function(streamId, query, fields, cb) {
	      
	      var response = "msg from searchInFeedPipe --Fields: " + fields;

              cb(null, response);
        }

        Feedlycom.remoteMethod('searchInBoardPipe', {
              http: {path: '/searchInBoardPipe', verb: 'get'},
              accepts:[ 
			{ arg: 'streamId', type: 'string' },
			{ arg: 'query', type: 'string' },
			{ arg: 'fields', type: 'string' }
	      ],
              returns: {arg: 'response', type: 'object', 'http': {source: 'object'}}
        });
};
