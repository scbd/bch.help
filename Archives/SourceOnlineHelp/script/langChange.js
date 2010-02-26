// Language changer plug-in version 1.0.1

/*
	This plug in allows to change the language in which the user is seeing a topic, without changing the currunt topic. For example, if the user is in topic Example (Example.html)
	of the help system and chooses to change to Spanish, the system will switch to Spanish version and show Ejemplo (Example.html) topic.
	
	This plug assumes that all languages are deployed with similar folder structure. For example, if the English version is in
	www.somedomain.com/help/en/webframe.html then the Spanish version should be in www.somedomain.com/help/es/webframe.html
	
	or, if the English version is in www.somedomain.com/help/en/some_complicated_structure/webframe.html then the Spanish version
	must be in www.somedomain.com/help/es/some_complicated_structure/webframe.html
	
	or, if the English version is in www.somedomain.com/help/some_complicated_structure/en/webframe.html then the Spanish version
	must be in www.somedomain.com/help/some_complicated_structure/es/webframe.html.
	
	However, some more complex combinations are allowed, as explained below.
	
	The change of language is performed by replacing "/en/"  by "/es/" in the URL.
	
	The folder in which each language is can be specified and configured.

*/

// langDirsString is list of the directory names, each one associated with a language. For example, "ar,en,es,fr,ru,zh". This value is received
// from a meta-variable from HelpStudio. It contains the folder names where the system in each language is, separated by commas. For example: "ar,en,es,fr,ru,zh"

var langDirsString = "ar,zh,en,fr,ru,es";
var languagesParsed = false;
var langDirs = null;

function parseLanguages(){
	if (!languagesParsed){
		langDirs = langDirsString.split(","); // creates an array of the language directories
		languagesParsed = true;
	}
}



/*
	This function does the actual change of language. The first step is to figure out in which language we currently are. This is done by
	analyzing the current URL. The last directory name in the URL indicates the current language. For example, if 
	langDirsString is "ar,en,es,fr,ru,zh" and the current URL is:
	
	www.somedomain.com/help/en/fr/webframe.html?Sometopic.html
	
	Then the current language is the one associated with "fr" (typically french), because "/fr/" is the rightmost substring of the URL out of 
	"/ar/", "/en/", "/es/", "/fr/" ,"/ru/", "/zh/"
	
	Conversly, if the URL is www.somedomain.com/help/en/fr/en/webframe.html?Sometopic.html, then the current language is English.
	
	The plug in enables to specify more complex directory names, for example, if the English version is in www.somedomain.com/help/en/webframe.html and
	the spanish version is in www.somedomain.com/ayuda/es/webframe.html, then we can handle this by giving langDirsString a value of "help/en,ayuda/es".
	
	Once we know which the current language is, the next step is to change it. First, the current language is replaced in the URL, for example,
	the last occurrence of "/fr/" is replaces by "/es/" if the current language is French and the target language is Spanish. However, the user 
	may be in some topic which is not present in the URL of the browser, so we remove the query string in the URL (everything past the "?" symbol) and
	we append the name of the html file of the current topic. We can find out the current topic by inspecting the location of the content frame.
	
	For example, the user might have used the table of contents to browse to topic Example1 (English version), but  the URL of his browser still reads as
	"www.somedomain.com/help/en/webframe.html". This is beacuase the change of topic only affected the contents frame, not the whole window. If he
	wants to change language to Spanish and he is redirected to "www.somedomain.com/help/es/webframe.html" then he will have to browse again to the
	topic Example1. That is not the desired behavior; we want to leave the user in the same topic, but in a different language.
	
	Therefore we need to append "?Example1.txt" to the resulting URL after removing everything past the "?" symbol (if it was there) and the "?" symbol itself.	
	
	Parameters:
		currentURL is the current URL of the browser. For example, www.somedomain.com/webframe.html
		currentTopic is the URL of the current topic (the location of the content frame), for example, www.somedomain.com/aTopic.html
		newLang is the new language to which to change, for example, "fr".
*/
function changeLanguage(currentURL, currentTopic, newLang){

	// Step one: find out current language
	if (!languagesParsed) 
		parseLanguages();
	
	currentLanguage = "";
	currentLanguagePos = -1;
	for (i=0; i<langDirs.length; i++){
		if (currentURL.lastIndexOf("/" + langDirs[i] + "/") > currentLanguagePos){
			currentLanguagePos = currentURL.lastIndexOf("/" + langDirs[i] + "/");
			currentLanguage = langDirs[i];
		}
	}
	
	// Now, currentLanguagePos has the position of the language that fits most at the right in the URL and currentLanguage has the directory of that language
	if (currentLanguagePos == -1){
		// No language dir matched in the URL, there is no known current language, abort! (do not change anything)
		return currentURL;
	}
	
	// Find out the current topic file name:
	//currentTopic = parent.frames['webcontent'].location.href;
	
	// Finally produce the target URL
	// if the current URL is www.somedomain.com/something1/currentLanguage/something2/webframe.html[?Sometopic.html]
	// then the target URL will be:
	// www.somedomain.com/something1/newLang/something2/webframe.html?currentTopic.html
	
	// We do NOT check that newLang is actually a "known" language.
	
	// Copy everything until the "/currentLanguage/" part:
	newURL = currentURL.substring(0, currentLanguagePos);
	// Append new language:
	newURL = newURL + "/" + newLang + "/";
	
	// Find out if we have a ? symbol in the current URL
	// and copy the rest of the current URL, from where currentLanguage ends to the "?" symbol
	queryPos = currentURL.lastIndexOf("?");
	if (queryPos == -1){ // no ? symbol
		newURL = newURL + currentURL.substring(currentLanguagePos + currentLanguage.length + 2); // copy all the rest of currentURL because there is no ? to avoid (+2 becuase of the two "/" surrounding the language name, for example, "/en/")
	}else{
		newURL = newURL + currentURL.substring(currentLanguagePos + currentLanguage.length + 2, queryPos);
	}
	
	// Finally, add the ?currentTopic.html part:
	// Current topic variable contains a URL, such as www.somedomain.com/aTopic.html. We need to keep only the aTopic.html part:
	pos = currentTopic.lastIndexOf("/");
	if (pos > 0)
		currentTopic = currentTopic.substr(pos+1);
	
	newURL = newURL + "?" + currentTopic;
	
	return newURL;
}
