;(function($, doc, win){
	var $doc = $(doc),
		$win = $(win),
		$bbcode, $entry, $dialog;

	var clab = {}
	clab.styles = {};
	clab.scripts = {};
	$.getStyle = function(url, callback) {
		//var basename = url.replace(/^.*\/|\.[^.]*$/g, '');
		if( !clab.styles[url] ) {
			$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
			clab.styles[url] = true;
		}
		if ($.isFunction(callback)) return callback();
	};
	$.getScript = function(url, callback, options) {
		//var basename = url.replace(/^.*\/|\.[^.]*$/g, '');
		if( clab.scripts[url] ) {
			$.isFunction(callback) && callback();
			return;
		}
		clab.scripts[url] = true;

		var o = $.extend({}, options, {
			cache: true, 
			dataType: 'script', 
			url: url, 
			success: callback,
			type: 'GET'
		});
		return $.ajax(o);
	};

	clab.log = function(data){
		return window.console && console.log(data);
	}

	function markitUp_init(){
		/*$(".lista_emoticones a").click(function(){
			emoticon=$(this).attr("title"); 
			$.markItUp({replaceWith:emoticon});
			return false;
		});
		$("#a_mas_emoticones a").click(function(){
			$("#mas_emoticones").show("normal");
			$("#a_mas_emoticones").hide();
			return false
		});*/
		
		$bbcode.markItUp(window.markItUp_settings);
		delete window.markItUp_settings;
	}

	function prettify() {
		var cache;
		cache = {
			o: {},
			lang: [],
			files: []
		};

		$('.prettyprint[data-lang]').each(function(i) {
			var $pre, lang;
			$pre = $(this);
			lang = $pre.data('lang');
			if (!lang || cache.o[lang]) return;
			cache.o[lang] = 1;
			cache.lang.push(lang);
			if (lang === 'css' || lang === 'sql') {
				return cache.files.push('http://google-code-prettify.googlecode.com/svn/trunk/src/lang-' + lang + '.js');
			}
		});

		if( cache.files.length ){
			return Modernizr.load([
				{
					load: cache.files,
					complete: function() {
						prettyPrint();
						return delete cache;
					}
				}
			]);
		} else {
			return prettyPrint();
		}
    }

    function preview_title_live(){
    	$post_title
			.on('change', preview_title)
			.on('keyup', preview_title);
    }
    function preview_live(e){
		$bbcode
    		.off('change', preview_live)
    		.off('keyup', preview_live);

    	preview();

    	setTimeout(function(){
    		$bbcode
    			.on('change', preview_live)
    			.on('keyup', preview_live);

    		preview();
    	}, 1000);
    }

    function preview_title(){
		$title.text( $post_title.val() );
    }

    clab.preview = preview;
    function preview(e){
    	if(e) e.preventDefault();
    	
		var bbcode_result = XBBCODE.process({
			text: $bbcode.val(),
			removeMisalignedTags: false,
			addInLineBreaks: true
		});
		
		if( window.console && bbcode_result.error ){
			console.error("Errors: " + bbcode_result.error);
			console.dir(bbcode_result.errorQueue);
		}
		
		$entry.html( bbcode_result.html );
		
		if ($('pre.prettyprint').length > 0) {
			$.getScript('http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js', prettify);
		}
    }
    
    function dialog_init(){
    	var $i_url  = $dialog.find('#image-url');
    	var $i_file = $dialog.find('#imgur');

    	$dialog.find('.dialog-radio')
    		.on('change', function(e){

				switch( $(this).val() ){
					case 'url':
						$i_file.prop('disabled',true);
						$i_url.prop('disabled',false);
						break;

					case 'file':
						$i_url.prop('disabled',true);
						$i_file.prop('disabled',false);
						break;
				}
				
				$i_url.hide();
				setTimeout(function(){
					$i_url.show();
				}, 30);

				$i_file.hide();
				setTimeout(function(){
					$i_file.show();
				}, 30);
				
			})
			.first().trigger('click');
    }

    function dialog_send(e){
    	e.preventDefault();

    	var $i_url  = $dialog.find('#image-url');
    	var $i_file = $dialog.find('#imgur');
    	var $btn    = $dialog.find('#dialog-insert');

    	$dialog.find('#dialog-insert')
    		.addClass('disabled')
    		.off('click');


		var opt = $dialog.find('.dialog-radio:checked').val();
		switch(opt){
			case 'url':
				var pattern_http = /https?:\/\/(.*)/i;
				var pattern_url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
				
				var url = $i_url.val();
				if( url.match(pattern_http) && url.match(pattern_url) ){
					$.markItUp({openWith:'[img]', closeWith:'[/img]', replaceWith:url});
					dialog_close();
				} else {
					alert('La URL de la imagen no es válida.');
					$i_url.focus();

					$dialog.find('#dialog-insert')
						.removeClass('disabled')
						.on('click', dialog_send);
				}
				break;

			case 'file':
				var files = $i_file.prop('files');
				if( files.length ){
					var res = upload( files[0], function(url){
						$.markItUp({openWith:'[img]', closeWith:'[/img]', replaceWith:url});
						dialog_close();
					});
					if( res === false ) {
						alert('El archivo seleccionado no es válido. Debe ser un archivo GIF, JPG o PNG.');
						$i_file.focus();
						$dialog.find('#dialog-insert')
							.removeClass('disabled')
							.on('click', dialog_send);
					}
				} else {
					alert('Debe seleccionar un archivo GIF, JPG o PNG.');
					$i_file.focus();
					$dialog.find('#dialog-insert')
						.removeClass('disabled')
						.on('click', dialog_send);
				}

				break;
		}
	}

    function upload(file, callback) {
		// file is from a <input> tag or from Drag'n Drop
		// Is the file an image?
		if (!file || !file.type.match(/image.*/)) return false;
		
		var fd = new FormData();
		fd.append("imgur", file);
		fd.append("upload_imgur", "x");

		// Create the XHR (Cross-Domain XHR FTW!!!)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "inc/upload.php");
		xhr.onload = function() {
			var data;
			try {
				data = JSON.parse(xhr.responseText);
				$.isFunction(callback) && callback(data.upload.links.original);
			} catch(err) {
				clab.log('[err] ' + xhr.responseText);
				alert('Ocurrió un error al intentar subir el archivo. Reportalo!');
				dialog_close();
			}
		}

		xhr.send(fd);

		return xhr;
	}

	clab.insertImage = function(markitup){
		if( markitup.selection.length ){
			$.markItUp({openWith:'[img]', closeWith:'[/img]'});
		} else {
			dialog_open();
		}
	}

    function dialog_open(){
    	var $i_url  = $dialog.find('#image-url');
    	var $i_file = $dialog.find('#imgur');

		$dialog.find('form')[0].reset();

    	$dialog.find('#dialog-insert')
			.removeClass('disabled')
			.on('click', dialog_send);

		$dialog.find('.dialog-radio:first').trigger('click');

		$dialog.show();
	}
	function dialog_close(){
		$dialog.hide();
	}
 
	function init(){
		$entry = $('#content-article .entry-content');
		$title = $('#content-article .entry-title');
		$bbcode = $("#bbcode");
		$dialog = $('#dialog-wrap');
		$post_title = $('#post-title');


		$bbcode.tabby();
		markitUp_init();
		dialog_init();


		preview_title_live();
		preview_live();
		$('#preview').on('click', preview);
	}

	$doc.one('ready', init);
	win.clab = clab;

})(jQuery, document, window);