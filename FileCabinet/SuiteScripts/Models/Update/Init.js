/**
 * Vendor.js
 * @NApiVersion 2.x
 */

var update = [
];

define( update,

function() {

	var returnObject = {};

	for( var i = 0; i < arguments.length; i++ ) {

		var modelNameStart = update[i].lastIndexOf('/') + 1,
			modelNameEnd = update[i].length,
			modelName = update[i].substring( modelNameStart, modelNameEnd );

		modelName = modelName.charAt(0).toLowerCase() + modelName.substr( 1 );

		returnObject[ modelName ] = arguments[i];

	}

	log.error('Return Read', returnObject);

	return returnObject;

});