const personagens = [
    { nome:"Link" , vida: 15, ataque: 10, defesa: 8 },
    { nome: "Zelda", vida: 12, ataque: 7, defesa: 9 },
    { nome: "Ganondof", vida: 20, ataque: 12, defesa: 10 }
]

const armas = [
    { tipo: "Master Sword", dano: 50, alcance: 3 },
    { tipo: "Arco sagrado", dano: 30, alcance: 10 },
    { tipo: "Faca de pão", dano: 1, alcance: 5 }
]

const itens = [
    { nome: "Poção de Vida", efeito: "Recupera corações" },
    { nome: "Bomba", efeito: "Explode" },
    { nome: "Veneno", efeito: "morte" }
]


function validarPersonagens(personagens) {
    for (let personagem of personagens) {
        if (!("nome" in personagem && "vida" in personagem && "ataque" in personagem && "defesa" in personagem)) {
            return `Erro: O personagem ${personagem.nome} não tem todos os atributos.`
        }
        if (!(personagem.vida >= 1 && personagem.vida <= 20)) {
            return `Erro: O personagem ${personagem.nome} tem corações de vida fora do intervalo permitido.`
        }
        if (personagem.ataque <= 0 || personagem.defesa <= 0) {
            return `Erro: O personagem ${personagem.nome} tem valores de ataque ou defesa inválidos.`
        }
    }
    return "Personagens validados com sucesso!"
}

function validarArmas(armas) {
    for (let arma of armas) {
        if (!("tipo" in arma && "dano" in arma && "alcance" in arma)) {
            return `Erro: A arma ${arma.tipo} não tem todos os atributos.`
        }
        if (arma.tipo === "") {
            return "Erro: Arma com tipo inválido."
        }
        if (arma.dano <= 0) {
            return `Erro: A arma ${arma.tipo} tem dano inválido.`
        }
    }
    return "Armas validadas com sucesso!"
}

function validarItens(itens) {
    for (let item of itens) {
        if (!("nome" in item && "efeito" in item)) {
            return `Erro: O item ${item.nome} não tem todos os atributos.`
        }
        if (item.nome === "") {
            return "Erro: Item com nome inválido."
        }
        if (item.efeito === "") {
            return `Erro: Item ${item.nome} com efeito inválido.`
        }
    }
    return "Itens validados com sucesso!"
}

console.log(validarPersonagens(personagens))
console.log(validarArmas(armas))
console.log(validarItens(itens))
