console.log('Client side javacript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data);
    });
});

fetch('http://localhost:3000/weather?address=boston').then((res) => {
    res.json().then((data) => {
        if (data.error) {
            return console.log(data.error);
        }
        console.log(data.location);
        console.log(data.forecast);
    })
})