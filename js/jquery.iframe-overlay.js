(function($){

			$.fn.iframeOverlay	= function(options)
			{
			
				// Set interval id
				var nIntId;
				var currDataItem = 0;
					
				var settings = $.extend({
					 
					 // These are the defaults.
					 			wrapper: "#embed-wrapper",
								defWidth: 610,
								defHeight: 712,
								overlay: "#overlay",
								closeOverlay: "#close-overlay",
								href:	'',
								prevId: "#previous",
								nextId: "#next",
								nextHref: '',
								prevHref: '',
								dataItem: 0
					 }, options );
					 
				
				
					// Index the items into an array and add data-item attribute to each.
					var i		= 0;
					var items	= [];
					
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
						
						nIntId = setInterval( function(){ sizeWrapper(); }, 300);	
				}
				
				/**
				 * Set the size of the embed wrapper.
				 */
				sizeWrapper	= function()
				{
						bw	= $("body").width();
						bh	= $("body").height();
							   
							   settings.wrapperWidth		= (bw > settings.defWidth) ? settings.defWidth : bw;
							   
							   settings.defHeight			= settings.wrapperWidth+100;
							   
							   settings.wrapperHeight		= (bh > settings.defHeight) ? settings.defHeight : bh+100;
							   
							   $(settings.overlay).css({width:"100%",height:"100%"});
							   
							   $(settings.wrapper).animate({width:settings.wrapperWidth,height:settings.wrapperHeight},1,function(){
							       
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
					
					cls	= $(settings.closeOverlay).height()*1.25;
					
					t		= ((bh-h)>cls) ? (bh-h)/2 : cls;
					l		= ((bw-w)>0) ? (bw-w)/2 : 0; 
					
					$(settings.wrapper).animate({"margin-top":t,"margin-left":l},1,function(){
						
						positionPrevNext();
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
					l = ((bw-settings.wrapperWidth)/2)-(h*2); 
					
					if(l<(h*2))
					{
						l=h*2;
					}

					$(settings.nextId).css({position:"absolute",top:t,left:l});
					$(settings.prevId).css({position:"absolute",top:t,right:l});
					
				 }
				
				
				/**
				 * Create a new iframe with the src from the clicked element.
				 */
				newIframe	= function()
				{
					html = '<iframe src="'+settings.href+'" frameborder="0" scrolling="no" allowtransparency="true" onload=""></iframe>';
					
					$(settings.wrapper).html(html);
					
					return false;

				}
				
				function showWrapper()
				{
					
					$(settings.wrapper).fadeIn(1300);
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
					var nIntervalId;

					sizeWrapper();
					
					closeOverlay();
					
					newIframe();
					
					showOverlay();

				};
				
				prevNextHandler();
				
				$("body").on("scroll",function(){
					
					
				});
				
			}
		
})(jQuery);