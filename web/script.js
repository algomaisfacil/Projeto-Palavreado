const tabelaPalavras = document.getElementById("tabelaPalavras");
const linhas = parseInt(tabelaPalavras.getAttribute("tentativas"));
const palavraLinhas = [];
const limiteChar = 5;
const letrasHTML = []
const palavras = []
const arquivoPalavras = 'palavras_5char_updated.txt';

const palavraDia = await pegarLinhaAleatoria();

let colunaAtual = 0;
let linhaAtual = 0;

for (let i = 0; i < linhas; i++){
    letrasHTML[i] = [];

    const palavraLinha = document.createElement("div");
    palavraLinha.setAttribute('id', 'palavraLinha_' + i);
    palavraLinha.setAttribute('class', 'palavraLinha');
    palavraLinhas[i] = palavraLinha;

    for (let j = 0; j < limiteChar; j++){
        const divLetra = document.createElement("div");
        divLetra.setAttribute('id', 'divLetra_' + i + '_' + j);
        divLetra.setAttribute('class', 'divLetra');
        palavraLinha.appendChild(divLetra);
        letrasHTML[i][j] = divLetra;

    }
    tabelaPalavras.appendChild(palavraLinha);
}

console.log(letrasHTML);
console.log(palavraLinhas);

document.addEventListener("keydown", async (KeyboardEvent) => {
    const tecla = KeyboardEvent.key;
    if(ehLetra(tecla)){
        if(colunaAtual < limiteChar && linhaAtual < linhas){
            let celulaAtual = letrasHTML[linhaAtual][colunaAtual];
            celulaAtual.textContent = tecla.toUpperCase();
            colunaAtual++;

            atualizarAnimacao(celulaAtual, "divLetra", "inputInserido")
            atualizarAnimacao(letrasHTML[linhaAtual][colunaAtual], "divLetra", "selecionado");
            
        }
    }
    
    else if(tecla === "Backspace" && colunaAtual > 0){
        colunaAtual--;
        let celulaAtual = letrasHTML[linhaAtual][colunaAtual];
        celulaAtual.textContent = "";
        atualizarAnimacao(celulaAtual, ".divLetra", "selecionado");
    }

    else if(tecla === "Enter"){
        let letrasAux = [];
        for(let i = 0; i < limiteChar; i++){
            letrasAux[i] = letrasHTML[linhaAtual][i].textContent
        }
        palavras[linhaAtual] = letrasAux.join("");

        let existeNaLista = await textoExiste(palavras[linhaAtual]);

        if(colunaAtual == limiteChar && existeNaLista){
            let palavraDiaChars = palavraDia.split('');
            console.log(`Char Palavra Dia: ${palavraDiaChars}`);
            for(let i = 0; i < limiteChar; i++){
                    if(letrasAux[i] === palavraDiaChars[i]){
                        console.log(`LETRA: ${letrasAux[i]} POS: ${i} VERDE!`);
                        letrasHTML[linhaAtual][i].classList.add("verde");
                    } else if (palavraDiaChars.includes(letrasAux[i])){
                        console.log(`LETRA: ${letrasAux[i]} POS: ${i} AMARELO!`);
                        letrasHTML[linhaAtual][i].classList.add("amarelo");
                    } else {
                        console.log(`LETRA: ${letrasAux[i]} POS: ${i} CINZA!`);
                        letrasHTML[linhaAtual][i].classList.add("cinza");
                    }


                console.log(letrasAux[i]);
            }

            palavras[linhaAtual] = letrasAux.join("");


            if(palavras[linhaAtual] == palavraDia){
                alert("VOCE GANHOU!");
            }

            linhaAtual++;
            colunaAtual = 0;
            atualizarAnimacao(letrasHTML[linhaAtual][colunaAtual], ".divLetra" ,"selecionado");
            
        } else {
            atualizarAnimacao(palavraLinhas[linhaAtual], ".palavraLinha", "erroEnter");
        }
    }

    console.log(tecla);
})

function ehLetra(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function atualizarAnimacao(celulaAtual, classeFixa, classeAnimacao) {
    const seletor = (classeFixa.charAt(0) == '.' ? classeFixa : `.${classeFixa}`);

    document.querySelectorAll(seletor).forEach((el) => {
        el.classList.remove(classeAnimacao);
    });

    void celulaAtual.offsetWidth;
    celulaAtual.classList.add(classeAnimacao);
}

async function pegarLinhaAleatoria() {
  let resposta = await fetch(arquivoPalavras);
  let texto = await resposta.text();
  
  let linhas = texto.split(/\r?\n/).filter(Boolean); 

  let linhaAleatoria = linhas[Math.floor(Math.random() * linhas.length)];
  
  return linhaAleatoria;
}

async function textoExiste(str) {
    let resposta = await fetch(arquivoPalavras);
    let texto = await resposta.text();

    let linhas = texto.split(/\r?\n/).filter(Boolean);

    return linhas.includes(str);
}