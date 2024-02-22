//colocar função octal
const numberFrom = document.getElementById("numberFrom");
const numberFor = document.getElementById("numberFor");
const calculate = document.getElementById("calculate");
const number = document.getElementById("number");
const result = document.getElementById("result");
const history = document.getElementById("historys");
const copyBtn = document.getElementById("copyBtn");



copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.value);
});

calculate.addEventListener("click", () => {
  if (numberFor.value === numberFrom.value) {
    result.value = `Escolha base difrentes`;

    addAccount(number.value, number.value);
  } else if (numberFor.value === "decimal" && numberFrom.value === "binario") {
    // b -> d
    if (!verifyInputNumber(number.value)) {
      result.value = `caracteres invalido`;
      return;
    }

    result.value = toDecimal(number.value);

    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else if (numberFor.value === "binario" && numberFrom.value === "decimal") {
    // d -> b
    if (!verifyInputNumber(number.value)) {
      result.value = `caracteres invalido`;
      return;
    }
    result.value = toBinario(number.value);
    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else if (
    // b -> h
    numberFor.value === "hexadecimal" &&
    numberFrom.value === "binario"
  ) {
    result.value = fromBinToHexadecimal(number.value);
    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else if (
    // d-> h
    numberFor.value === "hexadecimal" &&
    numberFrom.value === "decimal"
  ) {
    result.value = toHexadecimal(number.value);
    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else if (
    // h-> d
    numberFor.value === "decimal" &&
    numberFrom.value === "hexadecimal"
  ) {
    result.value = fromHexToDecimal(number.value);
    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else if (
    // h-> b
    numberFor.value === "binario" &&
    numberFrom.value === "hexadecimal"
  ) {
    result.value = fromHexToBin(number.value);
    addAccount(number.value, result.value, numberFor.value, numberFrom.value);
  } else {
    result.value = "Opção invalída";
  }
});

function verifyInputNumber(value) {
  return /^\d+$/.test(value.replace(/\s/g, ""));
}

function toBinario(numberDecimal) {
  const binario = [];
  let numberCurrent = numberDecimal;
  let binarioNumber = 0;
  while (numberCurrent > 0) {
    binarioNumber = numberCurrent % 2;
    binario.push(binarioNumber);
    numberCurrent = Math.floor(numberCurrent / 2);
  }
  return binario.reverse().join("");
}

function toHexadecimal(numberDecimal) {
  const hexadecimal = [];
  let numberCurrent = numberDecimal;
  let hexadecimalNumber = 0;
  while (numberCurrent > 0) {
    hexadecimalNumber = numberCurrent % 16;
    if (hexadecimalNumber === 10) {
      hexadecimal.push("a");
    } else if (hexadecimalNumber === 11) {
      hexadecimal.push("b");
    } else if (hexadecimalNumber === 12) {
      hexadecimal.push("c");
    } else if (hexadecimalNumber === 13) {
      hexadecimal.push("d");
    } else if (hexadecimalNumber === 14) {
      hexadecimal.push("e");
    } else if (hexadecimalNumber === 15) {
      hexadecimal.push("f");
    } else {
      hexadecimal.push(hexadecimalNumber);
    }

    numberCurrent = Math.floor(numberCurrent / 16);
  }
  return hexadecimal.reverse().join("");
}

function toDecimal(numberBinario) {
  let binario = numberBinario.split("").reverse();
  let decimal = 0;
  binario.forEach((bit, index) => {
    bit === "1" ? (decimal += 2 ** index) : 0;
  });
  return decimal;
}

function fromHexToBin(numberHexadecimal) {
  const decimal = fromHexToDecimal(numberHexadecimal);
  return toBinario(decimal);
}

function fromHexToDecimal(numberHexadecimal) {
  let hexadecimal = numberHexadecimal.split("").reverse();
  let decimal = 0;
  let decimalFInal = 0;
  hexadecimal.forEach((caractere, index) => {
    if (caractere === "a") {
      decimal = 10;
    } else if (caractere === "b") {
      decimal = 11;
    } else if (caractere === "c") {
      decimal = 12;
    } else if (caractere === "d") {
      decimal = 13;
    } else if (caractere === "e") {
      decimal = 14;
    } else if (caractere === "f") {
      decimal = 15;
    } else {
      decimal = parseInt(caractere);
    }
    decimalFInal += decimal * 16 ** index;
  });
  return decimalFInal;
}

function fromBinToHexadecimal(numberBinario) {
  let hexadecimal = "";
  let binario = numberBinario.split("");
  while (binario.length !== 0) {
    let caracterBinario = binario.splice(binario.length - 4);
    const number = toDecimal(caracterBinario.join(""));
    if (number === 10) {
      hexadecimal += "a";
    } else if (number === 11) {
      hexadecimal += "b";
    } else if (number === 12) {
      hexadecimal += "c";
    } else if (number === 13) {
      hexadecimal += "d";
    } else if (number === 14) {
      hexadecimal += "e";
    } else if (number === 15) {
      hexadecimal += "f";
    } else {
      hexadecimal += number;
    }
  }
  return hexadecimal.split("").reverse().join("");
}

window.onload = function () {
  alert(
    "Bem-vindo!\n\nAqui estão algumas informações sobre como usar esta página:\n\nPasso 1: Escolha a base atual do seu número.\nPasso 2: Escolha para qual base deseja converter.\nPasso 3: Clique no botão 'Calcular'.\n\nExtras:\n- O botão 'Copy' copia o resultado atual que está no display.\n- Operações com vírgula não estão disponíveis, apenas números inteiros.\n- A função 'Octal' não está disponível.\n\nNota do desenvolvedor:\nProjeto feito durante a primeira aula de sistemas, onde aprendemos bases numéricas."
  );
};

function addAccount(numberResult, number, fromValue, toValue) {
  const div = document.createElement("div");
  div.classList.add("results");
  const pNumber = document.createElement("p");
  pNumber.innerText = number;
  const pConversion = document.createElement("p");
  pConversion.innerText = `${fromValue[0]}-->${toValue[0]}`;
  const pNumberResult = document.createElement("p");
  pNumberResult.innerText = numberResult;

  div.append(pNumberResult, pConversion, pNumber);
  history.appendChild(div);
}
