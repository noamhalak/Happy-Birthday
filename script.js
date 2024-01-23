window.addEventListener('DOMContentLoaded', function() {
    var candle = document.getElementById('candle');
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var analyzer = audioContext.createAnalyser();
    var microphone;
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyzer);
      })
      .catch(function(err) {
        console.error('Error accessing microphone:', err);
      });
  
    function blowOutCandle() {
      candle.classList.add('candle-off');
      document.removeEventListener('click', blowOutCandle);
    }
  
    function analyzeAudio() {
      var frequencies = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(frequencies);
      var average = getAverage(frequencies);
  
      if (average > 120) {
        blowOutCandle();
      }
  
      requestAnimationFrame(analyzeAudio);
    }
  
    function getAverage(array) {
      var sum = array.reduce(function(a, b) {
        return a + b;
      }, 0);
      return sum / array.length;
    }
  
    requestAnimationFrame(analyzeAudio);
  });
  