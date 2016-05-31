var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoInput;
var videoBtn;
var selectedFunction;

var socket = io()
var range_val = $("#range_val")
var raw_val = $("#raw_val")

var lastVal = 0

var videoId = "bruxfAsJbeE"
$(document).ready(function () {
  videoInput = $("#videoUrl")
  videoBtn = $("#videoBtn")

  videoBtn.on("click", function (event) {
    videoId = videoInput.val()

    if (player) {
      player.loadVideoById(videoId, lastVal || 0)      
    }
  })
})

function onYouTubeIframeAPIReady() {
  var ready = false

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });

  function onPlayerReady () {
    ready = true

    socket.on("pot", function (potVal) {
      var duration = player.getDuration() 
      var rangeVal = potVal.map(0, 1023, 0, duration)

      raw_val.html(potVal)
      range_val.html(rangeVal)


      if (player.getPlayerState() == 1 && (!lastVal || difference(rangeVal, lastVal) >= 3)) {
        lastVal = rangeVal
        player.seekTo(rangeVal, true)
      }  
    })

    socket.on("pht", function (photoVal) {
      controlVolume(photoVal)
    })

  }

  function difference (lastVal, currentVal) {
    return Math.abs(Math.abs(currentVal) - Math.abs(lastVal))
  }

  function controlVolume (potVal) {
    var volRange = potVal.map(0, 1023, 0, 100)

    player.setVolume(volRange)
  }

}
