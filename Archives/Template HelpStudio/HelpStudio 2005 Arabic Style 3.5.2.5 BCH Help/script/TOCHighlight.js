// TOC Highlight plug-in Version 1.1.4

// Functions developed by the OnLineHelp Team to allow the HelpSystem to always show 
// the entry in the table of contents corresponding to the topic being viewed.

function leftTrim(sString){
	while (sString.substring(0,1) == ' '){
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function rightTrim(sString){
	while (sString.substring(sString.length-1, sString.length) == ' '){
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function trimAll(sString){
	while (sString.substring(0,1) == ' '){
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' '){
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function findLinkInTOC(linkURL, tocRoot){
	var ul = tocRoot;
	
	if (!ul.childNodes || ul.childNodes.length == 0) return null;
	for (var itemi=0;itemi<ul.childNodes.length;itemi++) {
		 var item = ul.childNodes[itemi];
		if (item.nodeName == "LI") {
 
			 var a;
			 var subul;
			 subul = "";
 
			 // Look in each LI child node for A or UL tags
			 for (var sitemi=0;sitemi<item.childNodes.length;sitemi++) {
				var sitem = item.childNodes[sitemi];
				switch (sitem.nodeName) {
						case "A":
							a = sitem;
							break;
					 // Found a UL - this is a book node
						case "UL":
							if (sitem.childNodes.length > 0)
							{
								if (trimAll(sitem.innerHTML).length > 0) {
									subul = sitem;
									break;
								}
							}
				 }
			 }

			// Now a has the link and subul has the sublist
			
			var unHref = a.href;
			// Tomar solo desde la última "/" en adelante:
			var pos = unHref.lastIndexOf("/");
			if (pos > 0)
				unHref = unHref.substr(pos+1);
			
			if (unHref == linkURL)
				return a;
			else{
				// Recursive call may return result or null. If null, continue searching in other sibling LIs.
				var result = findLinkInTOC(linkURL, subul);
				if (result != null)
					return result;
			}	
											
		}
	}
	return null;
}

// Opens the TOC so that the route to the specified link is shown. This method receives an Anchor HTML element (link) to be shown.
// tocFrame is a reference to the frame containing the table of contents (webtoc.html)
function showLinkInTOC(link, tocFrame){
      
	if (link == null) return;
	var A = link;
	if (A.nodeName != "A") return;
	
	var LI = link.parentNode;
	if (LI.nodeName != "LI") return;

	// LI's parent is an UL:
	var UL = LI.parentNode;
	if (UL.nodeName != "UL") return;
	
	// UL's parent is parent LI in the TOC
	var UlEsRaiz = false;
	var parentLI = UL.parentNode;
	if (parentLI.nodeName != "LI") 
		UlEsRaiz = true;
	
	// Find parentLI's Anchor:
	var parentA;
	if (!UlEsRaiz) {
		for (var sitemi=0;sitemi<parentLI.childNodes.length;sitemi++) {
			var sitem = parentLI.childNodes[sitemi];
			if (sitem.nodeName == "A")
				parentA = sitem;
		}	

		if (parentA != null)
			showLinkInTOC(parentA, tocFrame);
	}
	//A.style.background="#ffa54a";
	//tocFrame.processUL(UL);
	if (isBook(A.parentNode) && (!bookIsOpen(A.parentNode)))
		A.onclick();	
	closeSiblings(A.parentNode);	// close everything that is not in the route to topic A
}

//Receives an LI
function isBook(item){

	for (var sitemi=0;sitemi<item.childNodes.length;sitemi++) {
		var sitem = item.childNodes[sitemi];
		switch (sitem.nodeName) {
			// Found a UL - this is a book node
			case "UL":
				if (sitem.childNodes.length > 0)
				{
					if (trimAll(sitem.innerHTML).length > 0) {
						return true;
					}
				}
		}
	}
	return false;			
}
	
// Receves an LI
function bookIsOpen(book){
	if (book.className == "tbo")
		return true;
	else
		return false;
}

// Closes all siblings of LI
function closeSiblings(LI){
	if (LI.nodeName != "LI"){
		return;
	}
	var UL = LI.parentNode;
	if (UL.nodeName != "UL"){ 
		return;
	}
	for (var i=0; i < UL.childNodes.length; i++) {
			var aLI = UL.childNodes[i];
			if ((aLI.nodeName == "LI") && (aLI != LI) && isBook(aLI)){
				aLI.className = "tbc";
				// find aLIs UL and A:
				var A = null;
				for (var j=0; j < aLI.childNodes.length; j++){
					if (aLI.childNodes[j].nodeName == "UL")
						aLI.childNodes[j].className = "tbc";			// makes children invisible
					else if (aLI.childNodes[j].nodeName == "A"){
						A = aLI.childNodes[j];
						A.className = "tbc";			// sets minus icon						
					}
				}
				
				// Finally, change the book icon for a closed book:
				AIcon = getAIcon(A);
	            if (aLI.getAttribute("icon") <= 0)
	            {
	            	if (aLI.getAttribute("isnew") == "True")
	            		AIcon.src = "webimages/3.gif";
	            	else
	                	AIcon.src = "webimages/1.gif";
				}
	            else
	                AIcon.src = "webimages/" + aLI.getAttribute("icon") + ".gif";								
			}
		}		
}

// Code for right-to-left TOC in Arabic: Finds the icon inside an anchor
// A problem in right-to-left rendering forced to add non-braking spaces between the +/- symbol and the book icon, what means the IMG tag with the book icon inside the anchor element is no longer the first child of the anchor element
function getAIcon(A){
	return findSubElement(A, "IMG");
}
// Code for right-to-left TOC in Arabic: Finds the span inside an anchor
// A problem in right-to-left rendering forced to add non-braking spaces between the the book icon and the link text
function getSpan(A){
	return findSubElement(A, "SPAN");
}

// Finds a sub element inside of elem, given its tag name. For example, it can find an IMG element inside and anchor.
// Returns the first sub element found
function findSubElement(elem, tagName){
	for (var i=0; i<elem.childNodes.length; i++) {
		var item = elem.childNodes[i];
		if (item.nodeName == tagName) 
			return item;
	}
	return null;
}
	
	
var highlightedLink = null;

function highlightLink(a){
	if (a == null) 
		return;
	if (highlightedLink != null){
		highlightedLink.style.backgroundColor = "";
	}
	highlightedLink = a;
	a.style.backgroundColor = tocHighlightColor;//"#ffa54a";
}


// Processes OnLoad event for the content frame. 
function TOCHighlightLoad(){

	// If the user uses the TOC to view a topic, then this method will be fired from "cntNavtoc" frame, else, it will be fired from "webcontent" frame
	var theTocFrame = null;
	if (this.name == "webcontent")
		theTocFrame = parent.frames['webnavbar'].frames['cntNavtoc'];
	else
		return
		//theTocRoot = documentElement("tocroot");
		
	var newContentURL = this.location.href;
    var pos = newContentURL.lastIndexOf("/");
    if (pos > 0)
		newContentURL = newContentURL.substr(pos+1);

	if (theTocFrame.lastClickedLink == null){ // user just entered help system, or has not yet used the toc
		var a = findLinkInTOC(newContentURL, theTocFrame.documentElement("tocroot"));
		showLinkInTOC(a, theTocFrame);
		theTocFrame.highlightLink(a);
	}else{  // user has clicked on an item in the TOC
		var currentTOCURL = theTocFrame.lastClickedLink.href;
		pos = currentTOCURL.lastIndexOf("/");
	    if (pos > 0)
			currentTOCURL = currentTOCURL.substr(pos+1);	
		if (currentTOCURL == newContentURL){   // the link the user has clicked is the same the page we are loading, there is no need to search
			showLinkInTOC(theTocFrame.lastClickedLink, theTocFrame);
			theTocFrame.highlightLink(theTocFrame.lastClickedLink);	
		} else {	// search in the TOC for the topic we are loading
			var a = findLinkInTOC(newContentURL, theTocFrame.documentElement("tocroot"));
			showLinkInTOC(a, theTocFrame);
			theTocFrame.highlightLink(a);
		}
		// In any case, remove the reference to the last clicked link in the TOC, which is no longer needed:
		theTocFrame.lastClickedLink = null;
		
		// We need to call theTocFrame.highlightLink instead of simply highlightLink beceause we need to access webtoc's instance of TOCHighlight.js,
		// in which we can permanently store a value in the variable "highlightedLink" (this variable is read and written by the highlightLink function).
		// The local instance of TOCHighlight belongs to the current topic and will be lost when another topic is loaded in the webcontent frame, so we
		// must not expect that a value stored in highlightedLink variable will be still there the next time a topic is loaded.
	}
}


