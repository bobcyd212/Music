!function($){
	function tabs(selectorOrDom){
		var $tabs = $(selectorOrDom)
		$tabs.on('click','.tabs-nav>li',function(e){
			var $li = $(e.currentTarget)
			var index = $li.index()
			$li.addClass('active').siblings().removeClass('active')
			$li.closest('.tabs').find('.tab-content').children().eq(index)
			  .addClass('active').siblings().removeClass('active')
		})
    }
    app.tabs = tabs
/*    window.tabs = tabs *///在window上加一个属性，是唯一一种可以使得自己被别的模块用的办法
}(jQuery,window)

