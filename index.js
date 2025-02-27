let inputSquare = document.getElementById("square"),
inputKrov = document.getElementById("krov"),
inputCoverage = document.getElementById("coverage"),
inputMembrane = document.getElementById("membrane"),
inputComplete = document.getElementById("complete"),
inputTotal = document.getElementById("total"),
inputContact = document.getElementById("contact"),
inputBtn = document.querySelector(".btn"),
coverage = 20;

function formValueCalc() {
    let squareAll = 0,
    sumKrov = 0,
    sumCoverage = 0,
    sumMembrane = 0,
    complete = 0,
    total = 0;

    if(inputSquare.value != 0) {
        squareAll = Number(inputSquare.value);
        sumKrov = squareAll + squareAll / 100 * Number(inputKrov.value);
    }

    if (Number(inputCoverage.value) == 1) {
        sumCoverage = sumKrov * coverage;
    } else {
        sumCoverage = (sumKrov * coverage) + (sumKrov * coverage / 100 * Number(inputCoverage.value));
    }

    sumMembrane = Number(inputMembrane.value) * squareAll;

    complete = sumCoverage + (sumCoverage / 100 * Number(inputComplete.value));

    total = sumMembrane + complete;
    inputTotal.value = total;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
    
        if (error === 0) {
            form.classList.add("sending");
            let response = await fetch("./sendmail2.php", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove("sending");
            } else {
                alert("Ошибка");
                form.classList.remove("sending");
            }

        } else {
            alert("заполните обязательные поля");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains("contact")) {
                if(telTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("error");
        input.classList.add("error");

    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("error");
        input.classList.remove("error");
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function telTest(input) {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
    }
})

