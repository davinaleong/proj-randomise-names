$(document).ready(() => {
    // Assign jQuery elements
    const randomiseNamesInput = $(".randomise-names textarea[name='names']");
    const randomiseNamesClear = $(".randomise-names .clear");
    const randomiseNamesSubmit = $(".randomise-names .submit");
    const randomiseNamesList = $(".randomise-names .list");
    const randomiseNamesAssigned = $(".randomise-names .assigned");

    // Clear randomise-names input when 'clear' button is clicked
    randomiseNamesClear.click(() => {
        clearRandomiseNamesInput();
    });

    // Randomise names when 'submit' button is clicked
    randomiseNamesSubmit.click(() => {
        // Get input values
        const val = randomiseNamesInput.val();

        // Only process values if it's not empty
        if (val !== '') {
            // Split names by end character
            const names = splitVal(randomiseNamesInput);

            // Create a copy of the split array
            const namesCopy = names.slice();

            // Shuffle array
            let randomised = shuffle(namesCopy.slice());
            // Reshuffle array
            randomised = reshuffle(names, randomised);

            // Clear result field
            clearRandomiseNames();

            // Render result
            randomiseNamesList.html(generateListHtml(namesCopy));
            randomiseNamesAssigned.html(generateListHtml(randomised));
        }
    });

    // Assign jQuery elements
    const randomiseGroupNamesInput = $(".randomise-group-names textarea[name='names']");
    const randomiseGroupNamesChunkInput = $(".randomise-group-names input[name='chunk']");
    const randomiseGroupNamesClear = $(".randomise-group-names .clear");
    const randomiseGroupNamesSubmit = $(".randomise-group-names .submit");
    const randomiseGroupNamesList = $(".randomise-group-names .list");
    const randomiseGroupNamesAssigned = $(".randomise-group-names .assigned");

    // Clear randomise-group-names input when 'clear' button is clicked
    randomiseGroupNamesClear.click(() => {
        clearRandomiseGroupNamesInput();
    });

    // Randomise grouped names when 'submit' button is clicked
    randomiseGroupNamesSubmit.click(() => {
        // Get input values
        const val = randomiseGroupNamesInput.val();
        const chunkVal = randomiseGroupNamesChunkInput.val();

        /*
         * Only process values if:
         *  1. Names input is not empty
         *  2. Chunk input is not empty
         *  3. Chunk is greater than 0
         */ 
        if (val !== '' && chunkVal !== '' && chunkVal > 0) {
            // Split names by end character
            const names = splitVal(randomiseGroupNamesInput);

            // Shuffle array
            let randomised = shuffle(names.slice());
            // Reshuffle array
            randomised = reshuffle(names, randomised);
            // Divided shuffled array into chunks
            randomised = divideArray(randomised, chunkVal);

            // Create a copy of the random-chunk array
            const randomisedCopy = randomised.slice();
            // Shuffle inner array
            randomisedCopy.map((array, index) => {
                const arrayCopy = array.slice();
                randomisedCopy[index] = shuffle(arrayCopy);
                randomisedCopy[index] = reshuffle(array, arrayCopy);
            });

            // Clear result field
            clearRandomiseGroupNames();

            // Render result
            let listHtmls = '';
            randomised.map(array => {
                listHtmls += generateListHtml(array, 'mb-3');
            });
            randomiseGroupNamesList.html(listHtmls);

            let assignedHtmls = '';
            randomisedCopy.map(array => {
                assignedHtmls += generateListHtml(array, 'mb-3');
            });
            randomiseGroupNamesAssigned.html(assignedHtmls);
        }
    });

    // Split val by end character
    function splitVal(element) {
        return element.val().split(/\r?\n/);
    }

    // Divide array into chunks
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

    // Generate list html from array
    function generateListHtml(array, className = '') {
        let olHtml = `<ol class="${className}">`;
        array.map(item => {
            olHtml += `<li>${item}</li>`;
        });
        olHtml += `</ol>`;

        return olHtml;
    }

    // Shuffle array
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

    // Reshuffle array if positions of value is the same as original array
    function reshuffle(array, randomised) {        
        array.map((item, index) => {
            if (array[index] == randomised[index]) {
                randomised = shuffle(randomised);
            }
        });

        return randomised;
    }

    // Clear randomise-names result field
    function clearRandomiseNames() {
        randomiseNamesList.html('');
        randomiseNamesAssigned.html('');
    }

    // Clear randomise-names result inputs
    function clearRandomiseNamesInput() {
        randomiseNamesInput.val('');
    }

    // Clear randomise-group-names result field
    function clearRandomiseGroupNames() {
        randomiseGroupNamesList.html('');
        randomiseGroupNamesAssigned.html('');
    }

    // Clear randomise-group-names inputs
    function clearRandomiseGroupNamesInput() {
        randomiseGroupNamesInput.val('');
        randomiseGroupNamesChunkInput.val('');
    }
});