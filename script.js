document.addEventListener('DOMContentLoaded', function () {
    const spaceship = document.getElementById('spaceship');
    const fire = document.getElementById('fire');

    let isBurning = false;

    spaceship.addEventListener('mouseover', function () {
        if (!isBurning) {
            fire.style.display = 'block';
            isBurning = true;
        }
    });

    spaceship.addEventListener('mouseout', function () {
        if (isBurning) {
            fire.style.display = 'none';
            isBurning = false;
        }
    });
});
