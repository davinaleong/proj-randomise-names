/*
Test values:

Jolyn
Davina
Gabby
Josh
Isaiah
Fiona
*/
$(document).ready(() => {
    const randomiseNamesInput = $("#randomiseNames textarea[name='names']");
    const randomiseNamesSubmit = $("#randomiseNames .submit");
    const randomiseNamesList = $("#randomiseNames .list");
    const randomiseNamesAssigned = $("#randomiseNames .assigned");

    randomiseNamesSubmit.click(() => {
        const val = randomiseNamesInput.val();

        if (val !== '') {
            const names = splitVal(randomiseNamesInput);
            const namesCopy = names.slice();
            let randomised = shuffle(names.slice());
            randomised = reshuffle(names, randomised);

            clearRandomiseNames();
            randomiseNamesList.html(generateListHtml(namesCopy));
            randomiseNamesAssigned.html(generateListHtml(randomised));
        }
    });

    const randomiseGroupNamesInput = $("#randomiseGroupNames textarea[name='names']");
    const randomiseGroupNamesChunkInput = $("#randomiseGroupNames input[name='chunk']");
    const randomiseGroupNamesSubmit = $("#randomiseGroupNames .submit");
    const randomiseGroupNamesList = $("#randomiseGroupNames .list");
    const randomiseGroupNamesAssigned = $("#randomiseGroupNames .assigned");

    randomiseGroupNamesSubmit.click(() => {
        const val = randomiseGroupNamesInput.val();
        const chunkVal = randomiseGroupNamesChunkInput.val();

        if (val !== '' && chunkVal !== '' && chunkVal > 0) {
            //TODO: Split Names
            const names = splitVal(randomiseGroupNamesInput);
            let namesCopy = names.slice();

            //TODO: Divide Names
            namesCopy = divideArray(namesCopy, chunkVal);
            console.log(namesCopy);

            //TODO: Randomise Names
            
            //TODO: Clear fields
            clearRandomiseGroupNames()
            //TODO: Render Names
            let olHtmls = '';
            
            //TODO: Render Randomised Names
        }
    });

    function splitVal(element) {
        return element.val().split(/\r?\n/);
    }

    // Credit: https://stackoverflow.com/questions/8495687/split-array-into-chunks
    function divideArray(array, chunk = 1) {
        if (chunk <= 0) {
            return array;
        }

        return array.reduce((chunks, item, index) => { 
            const chunkIndex = Math.floor(index / chunk)
          
            if(!chunks[chunkIndex]) {
              chunks[chunkIndex] = [] // start a new chunk
            }
          
            chunks[chunkIndex].push(item)
          
            return chunks
          }, []);
    }

    function generateListHtml(array, className = '') {
        let olHtml = `<ol class="${className}">`;
        array.map(item => {
            olHtml += `<li>${item}</li>`;
        });
        olHtml += `</ol>`;

        return olHtml;
    }

    // Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function reshuffle(array, randomised) {        
        array.map((item, index) => {
            if (array[index] == randomised[index]) {
                randomised = shuffle(randomised);
            }
        });

        return randomised;
    }

    function clearRandomiseNames() {
        randomiseNamesInput.val('');
        randomiseNamesList.html('');
        randomiseNamesAssigned.html('');
    }

    function clearRandomiseGroupNames() {
        randomiseGroupNamesInput.val('');
        randomiseGroupNamesChunkInput.val('');
        randomiseGroupNamesList.html('');
        randomiseGroupNamesAssigned.html('');
    }
});