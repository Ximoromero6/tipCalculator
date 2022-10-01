(function() {

    const form = document.getElementById("formCalculateTip");
    const percentageTips = document.querySelectorAll('input[name="percentageValue"]');
    const inputRadioCustomNumber = document.getElementById("inputRadioCustomNumber");
    const inputBill = document.getElementById("bill");
    const inputNumberOfPeople = document.getElementById("numberOfPeople");
    const resetButton = document.getElementById("resetButton");

    let percentageValue = null;
    let bill = null;
    let numberOfPersons = null;

    inputRadioCustomNumber.addEventListener("keyup", (evt) => {
        const inputRadio = document.getElementById("inputRadioCustom");

        if (inputRadio.value != "") {
            inputRadio.value = evt.target.value;
            percentageValue = inputRadio.value;
        }
    });

    inputRadioCustomNumber.addEventListener("click", () => {
        document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
        });
    });

    for (let i = 0; i < percentageTips.length; i++) {
        const element = percentageTips[i];

        element.addEventListener("click", (evt) => {
            calculateBill(bill, percentageValue, numberOfPersons);
            /* Al hacer click sobre un "botón" eliminamos la clase
            selected de todos para aplicarla al seleccionado */

            document.querySelectorAll(".selected").forEach((el) => {
                el.classList.remove("selected");
            });


            if (evt.target.checked) {
                element.previousElementSibling.classList.add("selected");
                percentageValue = evt.target.value;
            }
        }, false);
    }

    inputBill.addEventListener("keyup", (evt) => {
        if (evt.target.value != "") {
            bill = evt.target.value;
        }
    });

    inputNumberOfPeople.addEventListener("keyup", (evt) => {
        if (evt.target.value != "") {
            numberOfPersons = evt.target.value;
        }
    });

    form.addEventListener("submit", (evt) => { evt.preventDefault(); });
    form.addEventListener("keyup", () => { calculateBill(bill, percentageValue, numberOfPersons); });

    function calculateBill(dollars, percentage, people) {

        if (!isNull(bill) && !isNull(percentageValue) && !isNull(numberOfPersons)) {
            console.log(`Dollars: ${dollars} Percentage: ${percentage} People: ${people}`);
            let total = (dollars * percentage) / people;
            total = Math.round(total * 100) / 100;
            total = total.toFixed(2);
            let totalPerPerson = (dollars / people) + parseFloat(total);
            totalPerPerson = Math.round(totalPerPerson * 100) / 100;
            totalPerPerson.toFixed(2);

            document.querySelector(".tipAmountPerson > h3").innerHTML = `$${total}`;
            document.querySelector(".totalPerson > h3").innerHTML = `$${totalPerPerson}`;
            resetButton.classList.remove("disabled");
        }
    }

    function isNull(text) {
        return text == null ? true : false;
    }

})();