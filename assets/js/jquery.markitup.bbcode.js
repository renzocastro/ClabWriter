// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// BBCode tags example
// http://en.wikipedia.org/wiki/Bbcode
// ----------------------------------------------------------------------------
// Feel free to add more tags
// ----------------------------------------------------------------------------
window.markItUp_settings = {
	afterInsert: function(markitup){
		window.clab.preview();
		return '';
	},
	previewParserPath:'', // path to your BBCode parser
	markupSet: [
		{name:'Negrita', key:'', openWith:'[b]', closeWith:'[/b]'},
		{name:'Cursiva', key:'', openWith:'[i]', closeWith:'[/i]'},
		{name:'Tachar', key:'', openWith:'[del]', closeWith:'[/del]'},
		{separator:' ' },
		{name:'Color', key:'', openWith:'[color=[![Escoje un color (red, green, blue, #FF00FF, etc)]!]]', closeWith:'[/color]', dropMenu: [
          {name:'Yellow',	openWith:'[color=#FCE94F]', closeWith:'[/color]', className:"col1-1" },
          {name:'Orange', 	openWith:'[color=#FCAF3E]', closeWith:'[/color]', className:"col1-2" },
		  {name:'Brown', 	openWith:'[color=#E9B96E]', closeWith:'[/color]', className:"col1-3" },
		  {name:'Green', 	openWith:'[color=#8AE234]', closeWith:'[/color]', className:"col1-4" },
		  {name:'Blue', 	openWith:'[color=#729FCF]', closeWith:'[/color]', className:"col1-5" },
		  {name:'Purple', 	openWith:'[color=#AD7FA8]', closeWith:'[/color]', className:"col1-6" },
		  {name:'Red', 		openWith:'[color=#EF2929]', closeWith:'[/color]', className:"col1-7" },
		  {name:'Gray', 	openWith:'[color=#FFFFFF]', closeWith:'[/color]', className:"col1-8" },
		  {name:'Gray', 	openWith:'[color=#888A85]', closeWith:'[/color]', className:"col1-9" },
		  
		  {name:'Yellow', 	openWith:'[color=#EDD400]', closeWith:'[/color]', className:"col2-1" },
          {name:'Orange', 	openWith:'[color=#F57900]', closeWith:'[/color]', className:"col2-2" },
		  {name:'Brown', 	openWith:'[color=#C17D11]', closeWith:'[/color]', className:"col2-3" },
		  {name:'Green', 	openWith:'[color=#73D216]', closeWith:'[/color]', className:"col2-4" },
		  {name:'Blue', 	openWith:'[color=#3465A4]', closeWith:'[/color]', className:"col2-5" },
		  {name:'Purple', 	openWith:'[color=#75507B]', closeWith:'[/color]', className:"col2-6" },
		  {name:'Red', 		openWith:'[color=#CC0000]', closeWith:'[/color]', className:"col2-7" },
		  {name:'Gray', 	openWith:'[color=#D3D7CF]', closeWith:'[/color]', className:"col2-8" },
		  {name:'Gray', 	openWith:'[color=#555753]', closeWith:'[/color]', className:"col2-9" },
		  
		  {name:'Yellow', 	openWith:'[color=#C4A000]', closeWith:'[/color]', className:"col3-1" },
		  {name:'Orange', 	openWith:'[color=#CE5C00]', closeWith:'[/color]', className:"col3-2" },
          {name:'Brown', 	openWith:'[color=#8F5902]', closeWith:'[/color]', className:"col3-3" },
          {name:'Green', 	openWith:'[color=#4E9A06]', closeWith:'[/color]', className:"col3-4" },
          {name:'Blue', 	openWith:'[color=#204A87]', closeWith:'[/color]', className:"col3-5" },
          {name:'Purple', 	openWith:'[color=#5C3566]', closeWith:'[/color]', className:"col3-6" },
          {name:'Red', 		openWith:'[color=#A40000]', closeWith:'[/color]', className:"col3-7" },
          {name:'Gray', 	openWith:'[color=#BABDB6]', closeWith:'[/color]', className:"col3-8" },
          {name:'Gray', 	openWith:'[color=#000000]', closeWith:'[/color]', className:"col3-9" }
		]},
		
		{name:'Tama\xf1o', key:'', openWith:'[size=[![Size?]!]]', closeWith:'[/size]', className:'fontsize', dropMenu:[
			{name:'8',	openWith:'[size=8]',  closeWith:'[/size]', className:'size1'},
			{name:'16',	openWith:'[size=16]', closeWith:'[/size]', className:'size2'},
			{name:'20',	openWith:'[size=20]', closeWith:'[/size]', className:'size3'},
			{name:'24',	openWith:'[size=24]', closeWith:'[/size]', className:'size4'}
		]},
		{separator:' ' },
		{name:'Enlace URL', key:'', openWith:'[url=[![URL]!]]', closeWith:'[/url]'},
		//{name:'Imagen', key:'', openWith:'[img][![URL de la imagen]!][/img]', closeWith:''},
		{name:'Imagen', key:'', openWith:'', closeWith:'',
			afterInsert: function(markitup) {
				window.clab.insertImage(markitup);
			}
		},
		{separator:' ' },
		{name:'Centrar', key:'', openWith:'[center]', closeWith:'[/center]'},
		{separator:' ' },

		
		{name:'Cita', key:'', openWith:'[quote=\"[![Autor de la cita]!]\"]', closeWith:'[/quote]'},
		//{name:'Codigo', key:'', openWith:'[code]', closeWith:'[/code]'},
		{name:'C\xf3digo', key:'', openWith:'[code]', 	closeWith:'[/code]', dropMenu:[
			{name:'Code',		openWith:'[code]',  closeWith:'[/code]', 	className:'code'},
			{name:'HTML',		openWith:'[html]',  closeWith:'[/html]', 	className:'code'},
			{name:'CSS',		openWith:'[css]', 	closeWith:'[/css]', 	className:'code'},
			{name:'Javascript',	openWith:'[js]',  	closeWith:'[/js]', 		className:'code'},
			{name:'PHP',		openWith:'[php]',  	closeWith:'[/php]', 	className:'code'},
			{name:'MySQL',		openWith:'[mysql]', closeWith:'[/mysql]', 	className:'code'},
			{name:'XML',		openWith:'[xml]',  	closeWith:'[/xml]', 	className:'code'},
			{name:'Actionscript',openWith:'[as]',  	closeWith:'[/as]', 		className:'code'},
			{name:'Flex',		openWith:'[flex]',  closeWith:'[/flex]', 	className:'code'},
			{name:'C++',		openWith:'[cplusplus]', closeWith:'[/cplusplus]', className:'code'},
			{name:'Java',		openWith:'[java]',  closeWith:'[/java]', 	className:'code'}
		]},
		{name:'Animaci\xf3n en Flash (SWF)', key:'', openWith:'\n[flash width=[![Ancho del SWF]!] height=[![Alto del SWF]!]][![URL del SWF]!][/flash]\n', closeWith:''},
		{name:'Video de youtube', key:'', openWith:'\n[flash width=600 height=365][![URL del video (Algo parecido a: http://www.youtube.com/v/vtA0NmZZvTA )]!][/flash]\n', closeWith:''},
		{separator:' ' },
		{name:'Lista normal', key:'', openWith:'[list]\n', closeWith:'\n[/list]'},
		{name:'Lista num&eacute;rica', key:'', openWith:'[list=[![N\xfamero de inicio (Normalmente 1)]!]]\n', closeWith:'\n[/list]'},
		{name:'Item de la lista', key:'', openWith:'[*] ', closeWith:''},
		{separator:' ' },
		
		{name:'T\xedtulo H2', key:'', openWith:'[h2]', closeWith:'[/h2]'},
		{name:'Subt\xedtulo H3', key:'', openWith:'[h3]', closeWith:'[/h3]'},
		{name:'Subt\xedtulo H4', key:'', openWith:'[h4]', closeWith:'[/h4]'},
		{separator:' ' },
		//{label:"Cerrar todas las etiquetas abiertas", accessKey:"", callBack:"closeAll"}, 
		{name:'Quitar todas las etiquetas del texto seleccionado', className:'clean', replaceWith:function(markitup) { return markitup.selection.replace(/\[(.*?)\]/g, "") } },
	]
}