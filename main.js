$(document).ready(function() {
    const randomiseNamesInput = $("#randomiseNames textarea[name='names']");
    const randomiseNamesSubmit = $("#randomiseNames .submit");

    randomiseNamesSubmit.click(function() {
        const names = splitVal(randomiseNamesInput);
        console.log(names);
    });
});

function splitVal(element) {
    return element.val().split(/\r?\n/);
}