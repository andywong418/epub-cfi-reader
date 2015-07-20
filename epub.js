var fs = require('fs');


function epub_read(epub_cfi) {
 try{
     

 	 // Get the EPUB's content document

 	 var packageDocument = get_the_package_document();

 	  // Get a reference to the "top level" content document in the CFI
    hrefOfContentDoc = EPUBcfi.Interpreter.getContentDocHref(epub_cfi, packageDocument);

    // Load the content document
    var contentDocument = get_the_content_document();

   // Open up the location in an iframe the location specified by the cfi
    var target = EPUBcfi.Interpreter.getTargetElement(epub_cfi, contentDocument);

    //inject iframe into location specified by cfi. so when the file is loaded  an iframe is opened pointing to that specific location.

    return EPUBcfi.Interpreter.injectRangeElements(epub_cfi, contentDocument, "<iframe></iframe");



    
    

    })
 }

 catch(err){
 	throw err;
 }
}