/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['/SuiteScripts/styles/chartist', 'N/file','N/ui/serverWidget'],

function(chartist, file, ui) {

    function onRequest(context) {
    	
    	var form = {}, upload = {}, html = '', dropzone = '', uploader = '';

    	
    	dropzone = file.load({
    		id: 'SuiteScripts/Assets/scripts/dropzone.js'
    	}).url;
    	
    	uploader = file.load({
    		id: 'SuiteScripts/Client/import_file.js'
    	}).url;

    	html = file.load({
    	    id: 'SuiteScripts/Assets/templates/uploader.html'
    	}).getContents();

    	html = '<script src="' + dropzone + '"></script>"' + '<script src="' + uploader + '"></script>"' + html;
    	log.error('HTML', html);    	
    	form = ui.createForm({
    		title: 'Upload'
    	});
    	
    	upload = form.addField({
    		id: 'custpage_upload',
    		label: 'upload',
    		type: 'INLINEHTML'
    	});
    	
    	upload.defaultValue = html;
    	
    	context.response.writePage(form);

    };

    return {
        onRequest: onRequest
    };
    
});
