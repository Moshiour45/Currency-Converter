const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const selctors = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector(".dropdowns button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selctors) {
    // I'm creating a list of countries in the dropdown
    for(let countryCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = countryCode;
        newOption.value = countryCode;
        if(select.name === "from" && countryCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && countryCode === "BDT"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target)
    });
}

const updateFlag = (element)=>{
    let selectedCountry = element.value;
    let countryCode = countryList[selectedCountry];
    let newSrcLink = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrcLink;
}

btn.addEventListener("click",(evt) => {
    updateCurrecy();

});

updateCurrecy = async ()=>{
    let inputBox = document.querySelector(".dropdowns input");
    let amount = inputBox.value;
    if(amount === "" || amount < 1){
        amount = 1;
        inputBox.value = 1;
    }
    let url = `${baseURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount = rate * amount;
    msg.innerText = `${amount} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

window.addEventListener("load", ()=>{
    updateCurrecy();
})