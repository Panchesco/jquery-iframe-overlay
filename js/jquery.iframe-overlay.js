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
								closeOverlay: ".close-overlay",
								href:	'',
								prevId: "#previous",
								nextId: "#next",
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
					
					
				
					$(this).each(function(){

						// Click event handler.
						$(this).on("click",function(){
						
							settings.dataItem	= $(this).attr("data-item");
							
							oldHref = setPrev(settings.dataItem);
							newHref = setNext(settings.dataItem);
							
							settings.href = $(this).attr("href");
							
							
							handleOverlay(settings);

							return false;
							    
							});
					});
					
									
	
				/** Functions ***********************************************************/
				
				
				/**
				 * Get the href value for the next older item.
				 * @param dataItem integer
				 * @return string
				 */
				 prevHref	= function()
				 {
				 
				 		// If at last item, go back to first.
				 		if(settings.dataItem==(items.length-1)){
						 	
						 	key = 0;
						 	
				 		} else {
				 		
				 			key = settings.dataItem+1;
						 	
				 		}

				 	return $(items[key]).attr("href");
				 }
				 
				 
				 /**
				 * Get the href value for the next newer/acsending item.
				 * @param dataItem integer
				 * @return string
				 */
				 nextHref	= function()
				 {
				 
				 	// If at last item, go back to first.
				 		if(settings.dataItem==0){
						 	
						 	key = items.length-1;
						 	
				 		} else {
				 		
				 			key = settings.dataItem-1;
						 	
				 		}

				 	return $(items[key]).attr("href");
				 }
				 
				 
				 /**
				  * Set href attr of #next link.
				  */
				  setNext	= function()
				  {
					  href = nextHref(settings.dataItem);
					  
					  return $(settings.nextId).attr("href",href);
				  }
				  
				  /**
				  * Set href attr of #next link.
				  */
				  setPrev	= function()
				  {
					  href = prevHref(settings.dataItem);
					  
					  return $(settings.prevId).attr("href",href);
				  }
	
				
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
					
					$(settings.wrapper).animate({"margin-top":t,"margin-left":l},1);

				}
				
				
				/** 
				 * Position previous/next links.
				 */
				 positionPrevNext	= function()
				 {
				 
				 	// TODO
					 
				 }
				
				
				/**
				 * Create a new iframe with the src from the clicked element.
				 */
				newIframe	= function(src)
				{
					html = '<iframe src="'+src+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
					
					$(settings.wrapper).html(html);
					
					return;

				}
				
				
				function findDataItem(src)
				{

					$(items).each(function(){
						href = $(this).attr("href");
						if(href==src)
						{
							settings.dataItem	=  $(this).attr("data-item");
							return;	
						}

					});
					
					

				}
				
				
				// Update next & previous links.
				
				// Next 
				nextIdHandler	= function()
				{
					$(settings.nextId).on("click",function(){
					
							var src = $(this).attr("href");

							// update dataItem var.
							if(settings.dataItem==0){
								settings.dataItem = items.length - 1;
							} else {
								settings.dataItem = settings.dataItem - 1;
							}
					
							setNext();
							
							newIframe(src);
							
							return false;
							
						});
				}
					
				// Previous 
				prevIdHandler	= function()
				{
					$(settings.prevId).on("click",function(){
					
							var src = $(this).attr("href");
							
							
							
							// update dataItem var.
							if(settings.dataItem<items.length){
								settings.dataItem = settings.dataItem + 1;
							} else {
								settings.dataItem = 0;
							}
					
							setPrev();
							
							newIframe(src);
							
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
					
					newIframe(settings.href,settings.dataItem);
					
					showOverlay();

						
				};
			
			}
		
})(jQuery);