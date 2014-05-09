		$.fn.iframeOverlay	= function(options)
		{
		
			// Set interval id
			var nIntId;
				
			var settings = $.extend({
				 // These are the defaults.
				 			wrapper: "#embed-wrapper",
							defWidth: 610,
							defHeight: 712,
							overlay: "#overlay",
							closeOverlay: ".close-overlay",
							href:	''
				 }, options );
			
			
			$(this).each(function(){
				
				$(this).on("click",function(){
				
						settings.href = $(this).attr("href")
						
						handleOverlay(settings);
						
						return false;
						    
						});
			
				});
			

			/** Functions ***********************************************************/

			
			/** 
			 * Close Overlay events.
			 */
			closeOverlay = function()
			{
				
				$(settings.closeOverlay).on("click",function(){
					$(settings.overlay).fadeOut(300);
				});
				
				$(settings.overlay).on("click",function(){
					$(this).fadeOut(300);
				});
				
				nIntIdClear();
			}
			
			
			function nIntIdClear()
			{
				clearInterval(nIntId);
			}
			
			
			/**
			 * Show overlay events.
			 */
			showOverlay	= function()
			{
					$(settings.overlay).fadeIn(300);
					
					nIntId = setInterval(function(){sizeWrapper()}, 300)
					
			}
			
			/**
			 * Set the size of the embed wrapper.
			 */
			sizeWrapper	= function()
			{
				bw	= $("body").width();
				bh	= $("body").height();
	
				
				w 	= (bw>settings.defWidth) ? settings.defWidth : bw;
				
				settings.defHeight = w+100;
				
				h 	= (bh>settings.defHeight) ? settings.defHeight : bh+100;
				
				$(settings.overlay).css({width:"100%",height:"100%"});
	
				$(settings.wrapper).animate({width:w,height:h},1,function(){
					
					positionWrapper();
					
				});
			}
			
			
			/**
			 * Position the wrapper.
			 */
			positionWrapper = function()
			{
				
				w	= $(settings.wrapper).width();
				h	= $(settings.wrapper).height();
				bw	= $("body").width();
				bh	= $("body").height();
				
				t		= ((bh-h)>0) ? (bh-h)/2 : 0;
				l	= ((bw-w)>0) ? (bw-w)/2 : 0; 
				
				$(settings.wrapper).animate({"margin-top":t,"margin-left":l},1,function(){
	
				});
				
			}
			
			
			/**
			 * Create a new iframe with the src from the clicked element.
			 */
			newIframe	= function(src)
			{
				html = '<iframe src="'+src+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
				$(settings.wrapper).html(html);

			}

			/**
			 * Actions to do when handling the overlay.
			 */
			handleOverlay = function(settings)
			{
				var nIntervalId;
				
				sizeWrapper();
				
				closeOverlay();
				
				newIframe(settings.href);
					
				showOverlay();
					
			};
		
		}