
//http://localhost/epub_project/book/9780198501008/OEBPS/xhtml/Chapter1.xhtml
//http://localhost/~androswong/epub_project/book/9780198501008/OEBPS/xhtml/Chapter1.xhtml
function showNodeFromCFI(epubcfi, isbn) {
	var iframe = document.createElement('iframe');
    getMeta(isbn, function(meta) {
        getOpf(meta, isbn, function(opf) {
            var href = getHref(opf, epubcfi);
            
            iframe.onload = function() {
                var epubDoc = iframe.contentDocument;
                var node = getNode(epubDoc, epubcfi);
                console.log(node);
                node.scrollIntoView();
                
                
                
            };
             iframe.src = "../../../~androswong/epub_project/book/" + isbn + "/OEBPS/" + href;
             iframe.width = "1000";
             iframe.height = "500";
             
             
        });
    });
    $(iframe).appendTo("body");
}

// get the xml of the container.xml file in META-INF dir, and feed to callback
function getMeta(isbn, callback) {
    $.get('../../../~androswong/epub_project/book/' + isbn + '/META-INF/container.xml', function(meta) {
        callback(meta);
    }, 'xml');

}

// get the xml of the content.opf file and feed to callback
function getOpf(meta, xml_isbn, callback) {
    var href = meta.getElementsByTagName('rootfile')[0].getAttribute('full-path');
    $.get('../../../~androswong/epub_project/book/' + xml_isbn + '/' + href, function(opf) {
        callback(opf);
    }, 'xml');
}

// get the href of the html file from the opfXML
//CONSOLE.LOG EVERYTHING when you debug
function getHref(opf, epubcfi) {
    var href;

    var idRef;
    // TODO
    var parse= epubcfi
    .split('epubcfi(')[1] //removes epub
    .split(')')[0] //removes ) bracket
    .split('/'); //splits into array

   
   
    
    var xmlHref = parse[2]; //gets the 4[chapter01]!
   
    var firstSquarePosition = xmlHref.indexOf('[');//gets position of [
    var lastSquarePosition = xmlHref.indexOf(']');//gets position of ]
    //assuming there is id referral
    var integerString = ""; //initalise string
       //get the id inside the [] brackets
    for (var i = firstSquarePosition + 1; i <lastSquarePosition; i++) {
             integerString += xmlHref[i];
    }
    
    idRef = opf.querySelector("#" + integerString); //gets the item id and references the element
    href = idRef.getAttribute("href"); //gets the href attribute of said element
        
  
    


    
    return href;
}


// get the node specified by the epub-cfi in the given document
//Check if the number is divisble by two.
//make it recur if it's an odd number


function getNode(contentDocument, epubcfi) {

    var parse= epubcfi
    .split('epubcfi(')[1] //removes epub
    .split(')')[0] //removes ) bracket
    .split('/'); //splits into array

    var cfiArray = parse.splice(3,3); //removing " ", "/6" and "/4" etc
    

    var nodeTracer = contentDocument.childNodes[0];

    
   
    for( var counter = 0; counter < cfiArray.length; counter++){
       
       
             var initSquarePosition = cfiArray[counter].indexOf('[')//get pos of [
             var finalSquarePosition = cfiArray[counter].indexOf(']'); //get pos of ]
             //if there's no id just use the number
             if (initSquarePosition === -1 ) {
                 if (cfiArray[counter] % 2 == 0) {
                  var stringConverter = parseInt(cfiArray[counter]);
                  
                  console.log(stringConverter);
                  nodeTracer = nodeTracer.childNodes[stringConverter -1];

                 }
                 else {
                    return null;
                 }


             }
               //use the id
             else {
                      
                    var idString = ""; //initalise string
                  //get the id inside the [] brackets
                  
                    for (var j = initSquarePosition + 1; j < finalSquarePosition; j++) {
                         idString += cfiArray[counter][j];
                    }
                    
                    if(contentDocument.getElementById(idString) !== null){
                        nodeTracer = contentDocument.getElementById(idString);
                    }
                    else{
                        nodeTracer = contentDocument.getElementsByClassName(idString)
                    }
                    
                  }
        
      
      

    }
    
    return nodeTracer;
    // var id = getId(epub-cfi);
    // var node = document.getElementById(id);
    // return node;
}