(function($){

			$.fn.iframeOverlay	= function(options)
			{
			
				// Set interval id
				var nIntId;
					
				var settings = $.extend({
					 
					 // These are the defaults.
					 			wrapper: "#embed-wrapper",
					 			wrapperTop: 0,
					 			wrapperLeft: 0,
					 			wrapperBottom: 0,
					 			wrapperRight: 0,
								defWidth: 610,
								defHeight: 712,
								overlay: "#overlay",
								closeOverlay: "#close-overlay",
								closeOverlayPos: "iframe-top-right",
								href:	'',
								prevId: "#previous",
								nextId: "#next",
								dataItem: 0,
								startDims: 0,
								controls: ".controls",
								video: true,
								videoClass: '.thumb-video',
								videoThumbTempSel: "#video-thumb-template"
								
									
					 }, options );
					 
				
					// Index the items into an array and add data-item attribute to each.

					var items = [];
					i = 0;
					$(this).each(function(){
						$(this).attr("data-item",i);
						items[i]	= $(this);
						i++;
						
					});
					
					
					settings.max = items.length-1;

				
					$(this).each(function(){

						// Click event handler.
						$(this).on("click",function(){
						
							
							settings.href = $(this).attr("href");
							
							settings.dataItem = $(this).attr("data-item");
							
							handleOverlay();

							return false;
							    
							});
					});
					
					// Set video thumbnail template to variable.
					if(settings.video === true)
					{
						var videoIndicatorHtml	= $(settings.videoThumbTempSel).html();
					}
							
	
				/** Functions ***********************************************************/
				
				
				/** 
				 * Close Overlay events.
				 */
				closeOverlay = function()
				{
					
					$(settings.closeOverlay).on("click",function(){
						$(settings.overlay).fadeOut(300,function(){
							emptyWrapper();
						});
					});
					
					$(settings.overlay).on("click",function(){
						$(this).fadeOut(300,function(){
							emptyWrapper();
						});
					});
					
					$(settings.nextId).css({display:"none"});
					$(settings.prevId).css({display:"none"});
					
					nIntIdClear();
				}
				
				/**
				 * Clear listener for window resizing.
				 */
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
						
						nIntId = setInterval( function(){ handleResize(); }, 300);	
				}
				
				
				/**
				 * Handle window resize.
				 */
				 handleResize = function()
				 {
					bw	= $("body").width();
					bh	= $("body").height();
					
					currDims = bw*bh;
					
					//Only try to resize the wrapper if the window dimensions have changed.
					if(currDims != settings.startDims)
					{
						
						$(settings.controls).hide();
						sizeWrapper();
					}
					
				 }
				
				/**
				 * Set the size of the embed wrapper.
				 */
				sizeWrapper	= function()
				{
						bw	= $("body").width();
						bh	= $("body").height();
						
						// Set the current window dimensions so we'll have something to check against if the window is resized.
						settings.startDims = bw*bh;
							   
							   settings.wrapperWidth		= (bw > settings.defWidth) ? settings.defWidth : bw;
							   
							   settings.defHeight			= settings.wrapperWidth+100;
							   
							   settings.wrapperHeight		= (bh > settings.defHeight) ? settings.defHeight : bh+100;
							   
							   $(settings.overlay).css({width:"100%","min-height":"100%"});
							   
							   settings.wrapperWidth*=.85;
							   settings.wrapperHeight*=.85;
							   
							   
							   
							   $(settings.wrapper).animate({width:settings.wrapperWidth,height:settings.wrapperHeight},1,function(){
							       
							       positionWrapper();
							       
							   });
				}
				
				
				/**
				 * Add overlay to thumbnails for video.
				 */
				 videoIndicator	= function()
				 {
					 
					 $(settings.videoClass).each(function(){
						
						
						if( false === $(this).hasClass('rendered'))
						{
							w = $(this).find("img").width();
							h = $(this).find("img").height();
							
							imgSrc = $(this).find("img").attr("src");
							
							$(this).children("a").children("img").remove();
							
							$(this).children("a").html(videoIndicatorHtml);
							
							$(this).css({width:w,height:h,background:'url('+imgSrc+') no-repeat center center'});
							
							$(this).addClass("rendered");
						}
						 
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
					l		= ((bw-w)>0) ? (bw-w)/2 : 0; 
					
					$(settings.wrapper).animate({"margin-top":t,"margin-left":l},1,function(){
					
					
					// Set settings.wrapper position properties.
					settings.wrapperTop		= t;
					settings.wrapperLeft	= l;
					settings.wrapperBottom	= t+settings.wrapperHeight;
					settings.wrapperRight	= l+settings.wrapperWidth;
					
					
					
						
						setTimeout(function(){
							
							positionPrevNext();
							positionCloseOverlay();
							
						},900);
						
						
					});

				}
				
				
				/** 
				 * Position previous/next links.
				 */
				 positionPrevNext	= function()
				 {
				 
				 	
				 	bh	= $("body").height();
				 	bw	= $("body").width();

					settings.defHeight = w+100;
					
					h 	= $(settings.nextId).height();
					
					t = (bh-h)/2;
					l = ((bw-settings.wrapperWidth)/2)-(h*1); // Play around with this setting to adjust distance of prev/next from wrapper edge. 
					
					if(l<(h*2))
					{
						l=h*2;
					}

					$(settings.nextId).css({display:"block",position:"absolute",top:t,left:l});
					$(settings.prevId).css({display:"block",position:"absolute",top:t,right:l});
					
				 }
				 
				 /**
				  * Position the close overlay link.
				  */
				  positionCloseOverlay	= function()
				  {
				  
				  					  
					  switch(settings.closeOverlayPos)
					  {
						  
						  default:
						  
						  clsHeight	= $(settings.closeOverlay).height();
						  clsT		= settings.wrapperTop - (clsHeight*.5);
						  clsL		= settings.wrapperLeft + settings.wrapperWidth - (clsHeight*.4);
						  $(settings.closeOverlay).animate({top:clsT,left:clsL},1,function(){
							  
							  $(settings.controls).fadeIn(300);
							  
						  });
						  
						  
						  break;
						  
					  }
					  
					  
				  }
				
				
				/**
				 * Create a new iframe with the src from the clicked element.
				 */
				newIframe	= function()
				{
					html = '<iframe src="'+settings.href+'" frameborder="0" scrolling="no" allowtransparency="true" onload="" autoplay></iframe>';
					
					$(settings.wrapper).html(html);
					
					return false;
				}
				
				/**
				 * Remove empty the wrapper.
				 */
				 emptyWrapper	= function()
				 {
					 $(settings.wrapper).html('');
				 }
				 

				 
				 /**
				  * Handle previous/next events.
				  */
				  prevNextHandler	= function()
				  {

				  		$(settings.nextId).on("click",function(){
							settings.dataItem--;
							if(settings.dataItem<0)
							{
								settings.dataItem = (items.length-1);	
							}
						
						settings.href = $(items[settings.dataItem]).attr("href");
						
						newIframe();
						
						return false;
					});		
					
					$(settings.prevId).on("click",function(){
						
						settings.dataItem++;
						
						if(settings.dataItem>(items.length-1))
						{
							settings.dataItem = 0;	
						}
						
						settings.href = $(items[settings.dataItem]).attr("href");
						
						newIframe();
						
						return false;
					});	
				  
				  }
				  
				
	
				/**
				 * Actions to do when handling the overlay.
				 */
				handleOverlay = function(settings)
				{

					sizeWrapper();
					
					closeOverlay();
					
					newIframe();
					
					showOverlay();

				};
				
				if(settings.video === true)
				{
					videoIndicator();
				}
				
				prevNextHandler();
				
				$("body").on("scroll",function(){
					
					
				});
				
			}
			
			
			
			
		
})(jQuery);