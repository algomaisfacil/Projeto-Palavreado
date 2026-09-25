const tabelaPalavras = document.getElementById("tabelaPalavras");
const linhas = parseInt(tabelaPalavras.getAttribute("tentativas"));
const limiteChar = 5;
const letras = []

let colunaAtual = 0;
let linhaAtual = 0;


for (let i = 0; i < linhas; i++){
    letras[i] = [];

    const linhaPalavra = document.createElement("div");
    linhaPalavra.setAttribute('id', 'palavraLinha_' + i)
    linhaPalavra.setAttribute('class', 'palavraLinha')
    for (let j = 0; j < limiteChar; j++){
        const divLetra = document.createElement("div");
        divLetra.setAttribute('id', 'divLetra_' + i + '_' + j);
        divLetra.setAttribute('class', 'divLetra')
        letras[i][j] = divLetra;
        linhaPalavra.appendChild(divLetra);
    }
    tabelaPalavras.appendChild(linhaPalavra);
}

console.log(letras);

document.addEventListener("keydown", (KeyboardEvent) => {
    const tecla = KeyboardEvent.key;
    if(ehLetra(tecla)){
        if(colunaAtual < limiteChar && linhaAtual < linhas){
            let celulaAtual = letras[linhaAtual][colunaAtual];
            celulaAtual.textContent = tecla.toUpperCase();
            colunaAtual++;
            atualizarFoco(letras[linhaAtual][colunaAtual]);
            
        }
    }
    
    else if(tecla === "Backspace" && colunaAtual > 0){
        colunaAtual--;
        let celulaAtual = letras[linhaAtual][colunaAtual];
        celulaAtual.textContent = "";
        atualizarFoco(celulaAtual);
    }

    else if(tecla === "Enter" && linhaAtual < linhas && colunaAtual == limiteChar){
        linhaAtual++;
        colunaAtual = 0;
        atualizarFoco(letras[linhaAtual][colunaAtual]);
    }

    console.log(tecla);
})

function ehLetra(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function atualizarFoco(celulaAtual) {
    document.querySelectorAll(".divLetra.selecionado").forEach((el) => {
        el.classList.remove("selecionado");
    });

    celulaAtual.classList.add("selecionado")
}