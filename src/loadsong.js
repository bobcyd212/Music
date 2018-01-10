
!function($,AV){
	loadSongs()
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
						    <span class="playsong"></span>
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
}(jQuery,AV)
