palavras = []

with open("palavras_5char.txt") as arquivo:
    for linha in arquivo:
        aux = linha.rstrip()
        if len(aux) == 5 and aux.isalpha():
            palavras.append(aux.upper())

for palavra in palavras:
    print(palavra)

with open("palavras_5char_updated.txt", 'x') as arquivo:
    for palavra in palavras:
        arquivo.write(palavra + '\n')
