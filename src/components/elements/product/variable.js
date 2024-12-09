export const createProductSteps = {
  CREATE: "create",
  ADDITIONAL_OPTIONS: "additional-optioins",
};

export const productCurrencies = {
  KH: {
    code: 'KHR',
    name: 'riel',
    label: "៛"
  },
  USD: {
    code: 'USD',
    name: 'dollar',
    label: "$"
  }
}

export const choiceSelectorTypes = {
  SINGLE: { index: 1, name: "Single", type: "SINGLE" },
  MULTIPLE: { index: 2, name: "Multiple", type: "MULTIPLE" },
  QUANTITY: { index: 3, name: "Quantity", type: "QUANTITY" },
};

export const Currency = {
  KHR: { code: "KHR", symbol: "៛" },
  USD: { code: "USD", symbol: "$" }
}

export const moneyNumber = (number = 0, currencyCode = Currency.KHR.code, opt = { hasSymbol: false }) => {
  let lastDigit = 0;

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  if (isFloat(number) || currencyCode == Currency.USD.code) {
    lastDigit = 2;
  }

  const options = {
    style: 'decimal',
    minimumFractionDigits: lastDigit,
    maximumFractionDigits: lastDigit,
  };

  const formattedWithOptions = number.toLocaleString('en-US', options);

  if (opt.hasSymbol) {
    const isRiel = currencyCode == Currency.KHR.code;
    return formattedWithOptions.toString() + (isRiel ? Currency.KHR.symbol : Currency.USD.symbol)
  }

  return formattedWithOptions;
}