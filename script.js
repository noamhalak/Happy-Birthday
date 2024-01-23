document.addEventListener('DOMContentLoaded', function () {
    const candle = document.getElementById('candle');

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            
            microphone.connect(analyser);
            
            analyser.fftSize = 256;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            analyser.getByteFrequencyData(dataArray);

            const average = () => {
                analyser.getByteFrequencyData(dataArray);
                const sum = dataArray.reduce((acc, val) => acc + val, 0);
                const avg = sum / bufferLength;
                return avg;
            };

            const updateCandle = () => {
                const avg = average();
                if (avg > 50) {
                    candle.classList.remove('light');
                } else {
                    candle.classList.add('light');
                }
                requestAnimationFrame(updateCandle);
            };

            updateCandle();
        })
        .catch(function (err) {
            console.error('Error accessing microphone:', err);
        });
});
