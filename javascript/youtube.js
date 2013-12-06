
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: 'xv7NtnoQopA',
          playerVars: {
            'controls': 1,
            'autohide': 1,
            'enablejsapi': 1,
            'origin:': 1
             },
          events: {
            'onReady': onPlayerReady,
            //'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
            'onStateChange': onPlayerStateChange,
            //'onError': onPlayerError
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        //event.target.playVideo();
        console.log(event.target.getDuration());
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      //var done = false;
      function onPlayerStateChange(event) {
        //playing
        
        if (event.data == 1) {          
          //document.getElementById('sound').style.opacity=0;
          document.getElementById('video').style.width = '80%';
          document.getElementById('video').style.top="20%";
          document.getElementById('video').style.left="20%";
          document.getElementById('video').style.height="70%";
          //document.getElementById('banner').style.top="400px";
         // document.getElementById('banner').style.top="400px";
         // document.getElementById('banner').style.webkitAnimation = "weird 1s infinite";
         // document.getElementById('banner').style.webkitAnimationPlayState = "running";
          //document.getElementById('sound').style.width="100%";
          //document.getElementById('sound').style.left="0%";

        }
        //paused
       // if (event.data == 2) {
         // document.getElementById('sound').style.opacity=1;
         // document.getElementById('video').style.width = '50%';
        //  document.getElementById('video').style.top="200px";
       //   document.getElementById('banner').style.top="0px";
       //   document.getElementById('banner').style.webkitAnimationPlayState = "paused";
          //document.getElementById('sound').style.width="50%";
          //document.getElementById('sound').style.left="50%";
       // }
        
      }
