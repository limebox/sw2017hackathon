/**
 * Vendor.js
 * @NApiVersion 2.x
 */
define([
	'./Create/Init',
	'./Read/Init',
	'./Update/Init',
	'./Delete/Init',
],

function( create, read ) {
	
	return {
		create:  create,
		read:    read
	};
	
});