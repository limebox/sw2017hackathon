var myChartist = new Chartist("#main_form", { url: "#"});

Chartist.options.myChartist = {
  init: function() {
    //this.on("addedfile", function(file) {
    	//require(['/SuiteScripts/Models/Init', 'N/file'], function( model, uploadFile ){
    		alert('it worked');
    	//});
    //});
  }
};