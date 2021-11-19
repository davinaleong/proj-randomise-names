$(document).ready(function() {
    const randomiseNamesInput = $("#randomiseNames textarea[name='names']");
    const randomiseNamesSubmit = $("#randomiseNames .submit");
    const randomiseNamesList = $("#randomiseNames .list");
    const randomiseNamesAssigned = $("#randomiseNames .assigned");

    randomiseNamesSubmit.click(function() {
        const names = splitVal(randomiseNamesInput);
        const namesCopy = names.slice();

        clearRandomiseNames();
        randomiseNamesList.html(generateListHtml(namesCopy));
        // TODO: randomise names
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

    function clearRandomiseNames() {
        randomiseNamesInput.val('');
        randomiseNamesList.html('');
        randomiseNamesAssigned.html('');
    }
});