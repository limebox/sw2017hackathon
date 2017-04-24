/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['/SuiteScripts/Models/Init', 'N/file','N/ui/serverWidget'],

function(models, file, ui) {

    function onRequest(context) {
    	
    	var form = {}, upload = {};//, html = '', dropzone = '', uploader = '';

    	
    	var chartistCSS = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.css'
    	}).url;
    	
    	var chartistJS = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.js'
    	}).url;
    	
    	var chartistJSMap = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.js.map'
    	}).url;
    	
    	//uploader = file.load({
    	//	id: 'SuiteScripts/Client/import_file.js'
    	//}).url;

    	var html = file.load({
    	    id: 'SuiteScripts/Assets/templates/what.html'
    	}).getContents();

    	html = '<script src="' + chartistCSS + '"></script>"' 
    		+ '<script src="' + chartistJS + '"></script>"' 
    		+ '<script src="' + chartistJSMap + '"></script>"'
    		//+ '<script src="' + uploader + '"></script>"'
    		+ html;
    	log.error('HTML', html);    	
    	form = ui.createForm({
    		title: 'what'
    	});
    	
    	upload = form.addField({
    		id: 'custpage_what',
    		label: 'what',
    		type: 'INLINEHTML'
    	});
    	
    	upload.defaultValue = html;
    	
    	context.response.writePage(form);

    };

    return {
        onRequest: onRequest
    };
    
});
