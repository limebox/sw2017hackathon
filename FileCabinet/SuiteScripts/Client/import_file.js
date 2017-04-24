var myDropzone = new Dropzone("#main_form", { url: "#"});

Dropzone.options.myDropzone = {
  init: function() {
    this.on("addedfile", function(file) {
    	require(['/SuiteScripts/Models/Init', 'N/file'], function( model, uploadFile ){
    		/*var fileObj = file.create({
    		    name: uploadFile.name,
    		    fileType: uploadFile.type,
    		    contents: uploadFile.contents,
    		    description: 'This is a plain text file.',
    		    encoding: file.Encoding.UTF8,
    		    folder: 30,
    		    isOnline: true
    		});*/
    	});
    });
  }
};