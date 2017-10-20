$(document).ready(function(){
  $(".btn-play").click(function(){
    if($("audio")[0].paused){
      songPlay();
    }
    else{
      songPause();
    }
  });

  $(".btn-forward").click(function(){
    GainSong();
  });
$(".btn-forward").trigger("click");
  $("audio").bind("ended",function(){
    GainSong();
  });

  //

  $(".glyphicon-refresh").on("click",function(){
  	if($("audio").is(function(){
  		 return typeof $("audio").attr("loop") =="string";
  	})){
  		$("audio").removeAttr("loop");
  		$(".glyphicon-refresh").removeClass("btn-loop");
  	}else{
          $("audio").attr("loop","loop");
          $(".glyphicon-refresh").addClass("btn-loop");
  	}
  });

  var timeLine = setInterval(function(){
    var length = $("audio")[0].currentTime/$("audio")[0].duration*100;
    $(".time-process").css("width",length+"%");
    if(length==1){
      clearInterval(timeLine);
    }
  },100);

  $(".time-line").on("mousedown",function(e){
    var parentLeft = $(this).offset().left;
    var currentLeft = e.pageX;
    var width = currentLeft - parentLeft;
    $("audio")[0].currentTime = $("audio")[0].duration*(width/$(this).width());
  });

  $(".action-progress").on("click",function(e){
    var totalVolume = $(this).offset().left;
    var mouseSite = e.pageX;
    var progress = mouseSite - totalVolume;
    $(".line").width(progress);
    $("audio")[0].volume = progress/$(this).width();
  });

  var timeText;
  var time ;
  setInterval(function(){
  	 time = Math.round($("audio")[0].currentTime);
  	if(time>=60){
             var mimute = Math.floor(time/60);
  	       if(mimute<10){
                   timeText = "0"+mimute;
             }else{
             	      timeText+=mimute;
             }
  	   	   if(time%60<10 && time%60>0){
  				timeText+=(":0"+time%60);
  		   }else{
  			 	timeText+=(":"+time%60);}
  	}else if(time>=10){
  		timeText = "00:"+time;
  	}else{
  		timeText ="00:0"+time;
  	}

  	$(".time").text(timeText);
  },1000);

  function songPlay(){
    $("audio")[0].play();
    $(".btn-play").removeClass("glyphicon-play").addClass("glyphicon-pause");
  }

  function songPause(){
    $("audio")[0].pause();
    $(".btn-play").removeClass("glyphicon-pause").addClass("glyphicon-play");
  }

/*  function GainChannel(){
  	$.ajax({
  		url:'http://api.jirengu.com/fm/getChannels.php',
  		dataType:'json',
  		type:"GET",
  		success:function(data){
  			var num = Math.floor(Math.random()*data.channels.length);
              var channelName = data.channels[num].name;
              var channelId = data.channels[num].channel_id;
              $(".current-channel > .channel").text(channelName);
              $(".current-channel > .channel").attr("data-id",channelId);
              GainSong();
              i=0;
  		}
  	});
  }*/
  function GainSong(){
  	$.ajax({
  		url:'http://api.jirengu.com/fm/getSong.php',
  		dataType:"json",
  		type:"GET",
  		data:{
              'channel':$("current-channel > channel").attr("data-id")
  		},
  		success:function(data){
              var song = data.song[0];
              var url = song.url,
              picture = song.picture,
              lyricId = song.sid,
              songId = song.ssid,
              title = song.title,
              author = song.artist;
              $("audio").attr("src",url);
              $(".music-photo").css("background-image","url("+picture+")");
              $(".Mname").text(title);
              $(".Sname").text(author);
              songPlay();
  		}
  	});

  }
  //_______________________ajax end_________________
  GainChannel();

  });
