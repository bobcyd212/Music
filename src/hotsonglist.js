!function($,AV){
	hotSongList()
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
}(jQuery,AV)
