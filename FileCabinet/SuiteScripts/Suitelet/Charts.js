/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['/SuiteScripts/Models/Init', 'N/file','N/ui/serverWidget'],

function(models, file, ui) {

    function onRequest(context) {
    	
    	var form = {};
    	
    	var chartistCSS = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.css'
    	}).url;
    	
    	var chartistJS = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.js'
    	}).url;
    	
    	var chartistJSMap = file.load({
    		id: 'SuiteScripts/Assets/styles/chartist.min.js.map'
    	}).url;
    	
    	var chartCreator = file.load({
    		id: 'SuiteScripts/Client/create_chart.js'
    	});
    	
    	var html = file.load({
    	    id: 'SuiteScripts/Assets/templates/charts.html'
    	}).getContents();
    	
    	var styles = '<link rel="stylesheet" type="text/css" href="' + chartistCSS + '">';
    	
    	html = styles + html;
    	html += '<script src="' + chartistJS + '"></script>"' 
    		+ '<script src="' + chartistJSMap + '"></script>"';
    	
    	form = ui.createForm({
    		title: 'Charts'
    	});
    
    	var charts = form.addField({
    		id: 'custpage_upload',
    		label: 'charts',
    		type: 'INLINEHTML'
    	});
    	
    	charts.defaultValue = html;
    	
    	context.response.writePage(form);

    };

    return {
        onRequest: onRequest
    };
    
});