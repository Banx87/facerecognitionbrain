const fs = require('fs');

fs.readFile('SantaFloor.txt', (err, data) => {
    console.time('funchallenge1'); // Start the timer
    // SPLIT THE DATA TO AN ARRAY OF "DIRECTIONS"
        const directions = data.toString().split('');
    // READ ARRAY CHARACTER BY CHARACTER
    const answer = directions.reduce((acc, currentValue) => {
        if(currentValue === '(') {
            return acc += 1;
        }   else if (currentValue === ')') {
            return acc -= 1;
        }}, 0);
    console.log('Santa is in ' + answer + ' floor.');
    console.timeEnd('funchallenge1');


    //QUESTION 2 things
// Find out the position santa goes to the basement for the first time (floor -1)
    console.time('funChallenge2');
    let accumulator = 0, counter = 0;
     directions.some((currentItem) => {
        if(currentItem === '(') {
             accumulator += 1;
        }   else if (currentItem === ')'){
             accumulator -= 1;
        }
        counter++;
        return accumulator < 0;
    });
    console.log('basement entered at:', counter);
    console.timeEnd('funChallenge2');
});



/*  for (let i = 0; i <= directions.length; i++) {
      if(directions[i] === '('){
          answer++;
      }
      else if(directions[i] === ')'){
          answer--;
      }
     // console.log(data[i].toString())
  }*/
