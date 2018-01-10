function loadSongs(){
	getSongs().then(fillSongs,function(error){console.log('获取歌曲失败')})
	function template(song,id,j){
	return 	`
	   <li>
            <a href="./play.html?id=${id}">   
		        <div class="songplay-list">
	                <div class="song-list">
					    <h3>${song.words}</h3>
						<p>
						    <i></i>${song.singer}
					    </p>
					</div>
					<div class="playsong_outer">
					    <span class="playsong">j</span>
					</div>
		        </div>
		    </a>
        </li>`
    }
    function getSongs(){
    	var queryLatest = new AV.Query('Song');
    	queryLatest.equalTo('Latest',true);
    	return queryLatest.find()
    }
    function fillSongs(results){
    	$('.song-loading').remove()
		for(var i=0; i<results.length;i++){
			var song = results[i].attributes
			var id =  results[i].id
	        var li = template(song,id)
			$('#list').append(li)
		}
    }	   
}

loadSongs()


function hotSongList(){
	getHotSongs().then(fillHotSongs,function(error){console.log('获取歌曲失败')})
	function templateHot(song,id,j){
	return `
	    <a class="m-sgitem" href="./play.html?id=${id}">
			<span class="serial-num">${j}</span>
			<div class="songplay-list">
				<div class="song-list">
				    <h3>${song.words}</h3>
					    <p>
						    <i></i>${song.singer}
					    </p>
				</div>
				<div class="playsong_outer">
				    <span class="playsong"></span>
				</div>
			</div>
		</a>        
	`
    }
    function getHotSongs(){
	var queryHot = new AV.Query('Song');
	queryHot.equalTo('hot',false);
	return queryHot.find()
    }
	function fillHotSongs(results){
		$('.song-loading').remove()
	    for(var i=0; i<results.length;i++){
	 		var song = results[i].attributes
	 		var id =results[i].id
	 		if(i<4){$('.serial-num').css('color','#df3436')}
	 		var j= 0
	 	    j = i +1
	 		if(i<10){j = '0'+ (i+1)}
	 		 
	 		var li = templateHot(song,id,j)
	 		$('ol#hotlist').append(li)	
		}
	}
}

hotSongList()
		   
		 	




$('.recom-item').on('click',function(){
	var txt = $(this).children().text()
	$('input#search').val(txt)
	$('input#search').trigger('input')  
})

var timer = null
$('input#search').on('input',function(e){
	styleActive()
	var value = $(e.currentTarget).val().trim()
    $('h3#bigResult').html('搜索' + ' ' +'"' + value+'"');
    throttle(function(){search(value)},300)
})
function throttle(callback,time){
    if(timer){ window.clearTimeout(timer) }
    time = setTimeout(function(){
    	time = null
    	callback()	
    },time)
}
function templateResults(result){
	var song = result.attributes
	return `
		<li class="recom-sear" data-id="${result.id}">
			<i class="u-svg u-svg-search"></i>
			<a href="./play.html?id=${result.id}">
		        <span class="recom-result">${song.words} - ${song.singer}</span>
		    </a>
		</li>
	`
}
function templateHistory(value){
	return `
        <li class="history-item">
					<i class="u-svg u-svg-history"></i>
					<div class="history">
						<span class="link">${value}</span>
						<figure class="close">
							<i class="u-svg u-svg-history"></i>
						</figure>
					</div>
	    </li>
    `
}
function searchSongs(value){
	var querySong = new AV.Query('Song');
	querySong.contains('words',value);
	var queryName = new AV.Query('Song');
	queryName.contains('singer',value)
	return AV.Query.or(querySong,queryName).find()
}
function generateSearchResult(results){
	$('#searchResult').empty()
    if(results.length === 0){
		$('h3#bigResult').html('抱歉，没有结果！')
	}else{
		for(var i=0;i<results.length;i++){
		var li = templateResults(results[i])
		$('#searchResult').append(li)
	    }
	}
}
function styleActive(){
	$('.m-hotlist').removeClass('active')
    $('#holder').removeClass('active')
    $('.m-recom').addClass('active')
    $('.m-history').addClass('hidden')
}
function styleReverse(){
	$('input#search').val('')
	$('.m-hotlist').addClass('active')
    $('#holder').addClass('active')
    $('.m-recom').removeClass('active')
    $('.m-history').removeClass('hidden')
}
function search(value){	
   if(value === ''){ styleReverse()}
   else{
	    var li = templateHistory(value)
		$('.history-list').prepend(li)
		$('#close').on('click',function(){ styleReverse() })
        searchSongs(value).then(generateSearchResult)
        }
}
		