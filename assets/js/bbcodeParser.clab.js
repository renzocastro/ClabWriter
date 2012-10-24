;(function(){
	bbcodeParser.addBBCode('[b]{TEXT}[/b]', '<strong>{TEXT}</strong>');
	bbcodeParser.addBBCode('[i]{TEXT}[/i]', '<em>{TEXT}</em>');
	bbcodeParser.addBBCode('[del]{TEXT}[/del]', '<del>{TEXT}</del>');
	bbcodeParser.addBBCode('[h2]{TEXT}[/h2]', '<h2>{TEXT}</h2>');
	bbcodeParser.addBBCode('[h3]{TEXT}[/h3]', '<h3>{TEXT}</h3>');
	bbcodeParser.addBBCode('[h4]{TEXT}[/h4]', '<h4>{TEXT}</h4>');
	bbcodeParser.addBBCode('[color={COLOR}]{TEXT}[/color]', '<span style="color:{COLOR}">{TEXT}</span>');

	bbcodeParser.addBBCode('[size={NUMBER}]{TEXT}[/size]', '<span style="font-size: {NUMBER}px; line-height: normal">{TEXT}</span>');
	
	bbcodeParser.addBBCode('[url={URL}]{TEXT}[/url]', '<a class="arti_link" href="{URL}" target="_blank">{TEXT}</a>');
	bbcodeParser.addBBCode('[url]{URL}[/url]', '<a class="arti_link" href="{URL}" target="_blank">{URL}</a>');
	
	bbcodeParser.addBBCode('[img]{URL}[/img]', '<img src="{URL}" border="0">');
	bbcodeParser.addBBCode('[center]{TEXT}[/center]', '<div style="text-align:center">{TEXT}</div>');
	bbcodeParser.addBBCode('[quote="{TEXT1}"]{TEXT2}[/quote]','<p class="datos_bloque"><strong>{TEXT1} escribió:</strong></p><div class="cita">{TEXT2}</div>');
	bbcodeParser.addBBCode('[quote]{TEXT}[/quote]','<div class="cita">{TEXT}</div>');

	var code_name = ['code','html','css','js','php','mysql','xml','as','flex','cplusplus','java'];
	var code_label = ['','HTML','CSS','Javascript','PHP','MySQL','XML','Actionscript','Flex','C++','Java'];
	var i, total=code_name.length;
	for(i=0;i<total;++i)
		bbcodeParser.addBBCode('['+code_name[i]+']{TEXT}[/'+code_name[i]+']','<p class="datos_bloque"><strong>Código '+code_label[i]+' :</strong></p><pre class="prettyprint lang-'+code_name[i]+'" data-lang="'+code_name[i]+'">{TEXT}</pre>');

	bbcodeParser.addBBCode('[flash width={NUMBER1} height={NUMBER2}]{URL}[/flash]','<object width="{NUMBER1}" height="{NUMBER2}"><param name="allowfullscreen" value="true"><param name="allowScriptAccess" value="never"><param name="swliveconnect" value="false"><param name="movie" value="{URL}"><embed src="{URL}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="never" swliveconnect="false" width="{NUMBER1}" height="{NUMBER2}"></object>');
	bbcodeParser.addBBCode('[li]{TEXT}[/li]','<li>{TEXT}</li>');
	bbcodeParser.addBBCode('[list]{TEXT}[/list]','<ul>{TEXT}</ul>');
	//bbcodeParser.addBBCode('[list={NUMBER}]{TEXT}[/list]','<ol type="{NUMBER}">{TEXT}</ol>');


	/**
	 * Part of the code in xbbcode.js
	 * http://patorjk.com/blog/2011/05/07/extendible-bbcode-parser-in-javascript/
	 */
	function fixStarTag(text) {
		text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
		text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

		while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function(matchStr,contents,endTag) {

			var innerListTxt = matchStr;
			while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function(matchStr,contents,endTag) {
				if (endTag === ">/list]") {
					endTag = "</li]</list]";
				} else {
					endTag = "</li][li]";
				}
				var tmp = "<li]" + contents + endTag;
				return tmp;
			})));

			innerListTxt = innerListTxt.replace(/>/g, "<");            
			return innerListTxt;
		})));

		// add ['s for our tags back in
		text = text.replace(/</g, "[");
		return text;
	}

	bbcodeParser.bbcodeToHtmlFix = function(text){
		return bbcodeParser.bbcodeToHtml( fixStarTag(text) );
	}

})();