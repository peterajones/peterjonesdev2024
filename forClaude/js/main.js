const API_KEY = config.API_KEY;
const BASE_URL = config.BASE_URL;
const DATA_URL = `${BASE_URL}${API_KEY}`;

const addCurrencyBtn = document.querySelector('.add-currency-btn');
const addCurrencyList = document.querySelector('.add-currency-list');
const currenciesList = document.querySelector('.currencies');
const fetchError = document.querySelectorAll('.fetch-error');

const initiallyDisplayedCurrencies = ["CAD", "USD", "EUR", "JPY"];
let baseCurrency;
let baseCurrencyAmount;

let currencies = [
  {
    name: "US Dollar",
    abbreviation: "USD",
    symbol: "\u0024",
    flagURL: "./img/flags/us.svg"
  },
  {
    name: "Euro",
    abbreviation: "EUR",
    symbol: "\u20AC",
    flagURL: "./img/flags/eu.svg"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "./img/flags/jp.svg"
  },
  {
    name: "British Pound",
    abbreviation: "GBP",
    symbol: "\u00A3",
    flagURL: "./img/flags/gb.svg"
  },
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "./img/flags/au.svg"
  },
  {
    name: "Canadian Dollar",
    abbreviation: "CAD",
    symbol: "\u0024",
    flagURL: "./img/flags/ca.svg"
  },
  {
    name: "Swiss Franc",
    abbreviation: "CHF",
    symbol: "\u0043\u0048\u0046",
    flagURL: "./img/flags/ch.svg"
  },
  {
    name: "Chinese Yuan Renminbi",
    abbreviation: "CNY",
    symbol: "\u00A5",
    flagURL: "./img/flags/cn.svg"
  },
  {
    name: "Swedish Krona",
    abbreviation: "SEK",
    symbol: "\u006B\u0072",
    flagURL: "./img/flags/se.svg"
  },
  {
    name: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "\u0024",
    flagURL: "./img/flags/nz.svg"
  },
  {
    name: "Mexican Peso",
    abbreviation: "MXN",
    symbol: "\u0024",
    flagURL: "./img/flags/mx.svg"
  },
  {
    name: "Singapore Dollar",
    abbreviation: "SGD",
    symbol: "\u0024",
    flagURL: "./img/flags/sg.svg"
  },
  {
    name: "Hong Kong Dollar",
    abbreviation: "HKD",
    symbol: "\u0024",
    flagURL: "./img/flags/hk.svg"
  },
  {
    name: "Norwegian Krone",
    abbreviation: "NOK",
    symbol: "\u006B\u0072",
    flagURL: "./img/flags/no.svg"
  },
  {
    name: "South Korean Won",
    abbreviation: "KRW",
    symbol: "\u20A9",
    flagURL: "./img/flags/kr.svg"
  },
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "./img/flags/tr.svg"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "./img/flags/ru.svg"
  },
  {
    name: "Indian Rupee",
    abbreviation: "INR",
    symbol: "\u20B9",
    flagURL: "./img/flags/in.svg"
  },
  {
    name: "Brazilian Real",
    abbreviation: "BRL",
    symbol: "\u0052\u0024",
    flagURL: "./img/flags/br.svg"
  },
  {
    name: "South African Rand",
    abbreviation: "ZAR",
    symbol: "\u0052",
    flagURL: "./img/flags/za.svg"
  },
  {
    name: "Philippine Peso",
    abbreviation: "PHP",
    symbol: "\u20B1",
    flagURL: "./img/flags/ph.svg"
  },
  {
    name: "Czech Koruna",
    abbreviation: "CZK",
    symbol: "\u004B\u010D",
    flagURL: "./img/flags/cz.svg"
  },
  {
    name: "Indonesian Rupiah",
    abbreviation: "IDR",
    symbol: "\u0052\u0070",
    flagURL: "./img/flags/id.svg"
  },
  {
    name: "Malaysian Ringgit",
    abbreviation: "MYR",
    symbol: "\u0052\u004D",
    flagURL: "./img/flags/my.svg"
  },
  {
    name: "Hungarian Forint",
    abbreviation: "HUF",
    symbol: "\u0046\u0074",
    flagURL: "./img/flags/hu.svg"
  },
  {
    name: "Icelandic Krona",
    abbreviation: "ISK",
    symbol: "\u006B\u0072",
    flagURL: "./img/flags/is.svg"
  },
  {
    name: "Croatian Kuna",
    abbreviation: "HRK",
    symbol: "\u006B\u006E",
    flagURL: "./img/flags/hr.svg"
  },
  {
    name: "Bulgarian Lev",
    abbreviation: "BGN",
    symbol: "\u043B\u0432",
    flagURL: "./img/flags/bg.svg"
  },
  {
    name: "Romanian Leu",
    abbreviation: "RON",
    symbol: "\u006C\u0065\u0069",
    flagURL: "./img/flags/ro.svg"
  },
  {
    name: "Danish Krone",
    abbreviation: "DKK",
    symbol: "\u006B\u0072",
    flagURL: "./img/flags/dk.svg"
  },
  {
    name: "Thai Baht",
    abbreviation: "THB",
    symbol: "\u0E3F",
    flagURL: "./img/flags/th.svg"
  },
  {
    name: "Polish Zloty",
    abbreviation: "PLN",
    symbol: "\u007A\u0142",
    flagURL: "./img/flags/pl.svg"
  },
  {
    name: "Israeli Shekel",
    abbreviation: "ILS",
    symbol: "\u20AA",
    flagURL: "./img/flags/il.svg"
  }
];

// Event Listeners

addCurrencyBtn.addEventListener('click', addCurrencyBtnClick);

function addCurrencyBtnClick(event) {
  addCurrencyBtn.classList.toggle("open");
}

addCurrencyList.addEventListener('click', addCurrencyListClick);

function addCurrencyListClick(event) {
  const clickedListItem = event.target.closest('li');
  if (!clickedListItem.classList.contains('disabled')) {
    const newCurrency = currencies.find(c => c.abbreviation === clickedListItem.getAttribute('data-currency'));
    if (newCurrency) newCurrenciesListItem(newCurrency);
    addCurrencyBtn.classList.toggle("open");
  }
}

currenciesList.addEventListener('click', currenciesListClick);

function currenciesListClick(event) {
  if (event.target.classList.contains("close")) {
    const parentNode = event.target.parentNode;
    parentNode.remove();
    addCurrencyList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove('disabled');
    if (parentNode.classList.contains('base-currency')) {
      const newBaseCurrencyLI = currenciesList.querySelector('.currency');
      if (newBaseCurrencyLI) {
        setNewBaseCurrency(newBaseCurrencyLI);
        baseCurrencyAmount = Number(newBaseCurrencyLI.querySelector('.input input').value);
      }
    }
  }
}

function setNewBaseCurrency(newBaseCurrencyLI) {
  newBaseCurrencyLI.classList.add('base-currency');
  baseCurrency = newBaseCurrencyLI.id;
  baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
  currenciesList.querySelectorAll('.currency').forEach(currencyLI => {
    const currencyRate = currencies.find(currency => currency.abbreviation === currencyLI.id).rate;
    const exchangeRate = currencyLI.id === baseCurrency ? 1 : (currencyRate / baseCurrencyRate).toFixed(4);
    currencyLI.querySelector('.base-currency-rate').textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
  });
}

currenciesList.addEventListener('input', currenciesListInputChange);

function currenciesListInputChange(event) {
  const isNewBaseCurrency = event.target.closest('li').id !== baseCurrency;
  if (isNewBaseCurrency) {
    currenciesList.querySelector(`#${baseCurrency}`).classList.remove('base-currency');
    setNewBaseCurrency(event.target.closest('li'));
  }
  const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
  if (baseCurrencyAmount !== newBaseCurrencyAmount || isNewBaseCurrency) {
    baseCurrencyAmount = newBaseCurrencyAmount;
    const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
    currenciesList.querySelectorAll('.currency').forEach(currencyLI => {
      if (currencyLI.id !== baseCurrency) {
        const currencyRate = currencies.find(currency => currency.abbreviation === currencyLI.id).rate;
        const exchangeRate = currencyLI.id === baseCurrency ? 1 : (currencyRate / baseCurrencyRate).toFixed(4);
        currencyLI.querySelector('.input input').value = exchangeRate * baseCurrencyAmount !== 0 ? (exchangeRate * baseCurrencyAmount).toFixed(4) : '';
      }
    });
  }
}

currenciesList.addEventListener('focusout', currenciesListFocusOut);

function currenciesListFocusOut(event) {
  const inputValue = event.target.value;
  if (isNaN(inputValue) || Number(inputValue) === 0) event.target.value = "";
  else event.target.value = Number(inputValue).toFixed(4);
}

currenciesList.addEventListener('keydown', currenciesListKeyDown);

function currenciesListKeyDown(event) {
  if (event.key === 'Enter') event.target.blur();
}

// Functions

function populateAddCurrencyList() {
  for (let i = 0; i < currencies.length; i++) {
    addCurrencyList.insertAdjacentHTML(
      "beforeend",
      `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} alt="flag" class="flag">
        <span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
      </li>`
    );
  }
}

function populateCurrenciesList() {
  for (let i = 0; i < initiallyDisplayedCurrencies.length; i++) {
    const currency = currencies.find(c => c.abbreviation === initiallyDisplayedCurrencies[i]);
    if (currency) newCurrenciesListItem(currency);
  }
}

function newCurrenciesListItem(currency) {
  if (currenciesList.childElementCount === 0) {
    baseCurrency = currency.abbreviation;
    baseCurrencyAmount = 0;
  }
  addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}`).classList.add('disabled');
  const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
  const exchangeRate = currency.abbreviation === baseCurrency ? 1 : (currency.rate / baseCurrencyRate).toFixed(4);
  const inputValue = baseCurrencyAmount ? (baseCurrencyAmount * exchangeRate).toFixed(4) : "";

  currenciesList.insertAdjacentHTML(
    "beforeend",
    `<li class="currency ${currency.abbreviation === baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="info">
        <p class="input"><span class="currency-symbol">${currency.symbol}</span><input placeholder="0.0000" value=${inputValue}></p>
        <p class="currency-name">${currency.abbreviation} - ${currency.name}</p>
        <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <span class="close">&times;</span>
    </li>`
  );
}

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.date').textContent = data.date;
    data.rates['EUR'] = 1;
    currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
    currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
    populateAddCurrencyList();
    populateCurrenciesList();
  })
  .then(data => data.error.message ? fetchError.insertAdjacentHTML(data.error.message) : "")
  .catch(err => console.log(err));
