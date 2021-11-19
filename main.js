$(document).ready(function() {
    const randomiseNamesInput = $("#randomiseNames textarea[name='names']");
    const randomiseNamesSubmit = $("#randomiseNames .submit");
    const randomiseNamesList = $("#randomiseNames .list");
    const randomiseNamesAssigned = $("#randomiseNames .assigned");

    randomiseNamesSubmit.click(function() {
        const val = randomiseNamesInput.val();

        if (val !== '') {
            const names = splitVal(randomiseNamesInput);
            const namesCopy = names.slice();
            const randomised = shuffle(names.slice());

            clearRandomiseNames();
            randomiseNamesList.html(generateListHtml(namesCopy));
            randomiseNamesAssigned.html(generateListHtml(randomised));
        }
    });

    function splitVal(element) {
        return element.val().split(/\r?\n/);
    }

    function generateListHtml(array) {
        let olHtml = '<ol>';
        array.map(item => {
            olHtml += `<li>${item}</li>`;
        });
        olHtml += '</ol>';

        return olHtml;
    }

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

    function clearRandomiseNames() {
        randomiseNamesInput.val('');
        randomiseNamesList.html('');
        randomiseNamesAssigned.html('');
    }
});