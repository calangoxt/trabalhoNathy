const capacidade = 10
let inventario = []

function adicionarItem(item) {
    const totalItens = inventario.reduce((total, i) => total + i.quantidade, 0)
    if (totalItens + item.quantidade > capacidade) {
        console.log("Inventário cheio! Não é possível adicionar o item.")
        return false
    }
    inventario.push(item)
    console.log(`Item adicionado: ${item.nome}`)
    return true
}

function removerItem(nome) {
    for (let i = 0 ;i < inventario.length; i++) {
        if (inventario[i].nome === nome) {
            inventario[i].quantidade--
            if (inventario[i].quantidade <= 0) {
                inventario.splice(i, 1)
            }
            console.log(`Item removido: ${nome}`)
            return true
        }
    }
    console.log("Item não encontrado no inventário.")
    return false
}

function exibirInventario() {
    console.log("Inventário:")
    if (inventario.length === 0) {
        console.log("Vazio")
        return
    }
    inventario.forEach((item, index) => {
        console.log(`${index + 1}: ${item.nome} (Quantidade: ${item.quantidade})`)
    })
}

const inimigos = [
    { nome: 'Zumbi 1', vida: 30 },
    { nome: 'Zumbi 2', vida: 25 },
    { nome: 'Boss Zumbi', vida: 100 }
]

const armas = [
    { nome: 'Faca', dano: 10, durabilidade: 5 },
    { nome: 'Pistola', dano: 20, durabilidade: 3 },
    { nome: 'Escopeta', dano: 30, durabilidade: 2 }
]

let jogador = {
    nome: 'Leon',
    vida: 100,
    historicoVida: [],
    salvarVida() {
        this.historicoVida.push(this.vida)
    }
}

function atacar(inimigoNome, armaNome) {
    const inimigo = inimigos.find(i => i.nome === inimigoNome)
    const arma = armas.find(a => a.nome === armaNome)

    if (!inimigo) {
        console.log("Inimigo não encontrado!")
        return
    }

    if (!arma) {
        console.log("Arma não encontrada!")
        return
    }

    if (arma.durabilidade <= 0) {
        console.log(`A arma ${armaNome} está sem durabilidade!`)
        return
    }

    inimigo.vida -= arma.dano
    arma.durabilidade--

    console.log(`${inimigo.nome} recebeu ${arma.dano} de dano. Vida restante: ${inimigo.vida}`)

    if (inimigo.vida <= 0) {
        console.log(`${inimigo.nome} foi derrotado!`)
        eliminarInimigo(inimigoNome)
    }
}

function eliminarInimigo(nome) {
    const indice = inimigos.findIndex(i => i.nome === nome)
    if (indice !== -1) {
        inimigos.splice(indice, 1)
        console.log(`Inimigo ${nome} removido do jogo.`)
    }
}

function exibirInimigos() {
    console.log("Inimigos restantes:")
    if (inimigos.length === 0) {
        console.log("Nenhum inimigo restante.")
        return
    }
    inimigos.forEach(inimigo => {
        console.log(`${inimigo.nome}: Vida ${inimigo.vida}`)
    })
}

function curar(quantidade) {
    jogador.salvarVida()
    jogador.vida += quantidade
    console.log(`${jogador.nome} foi curado em ${quantidade} pontos de vida. Vida atual: ${jogador.vida}`)
}

let estadoJogo = null
function salvarProgresso() {
    estadoJogo = {
        jogador: { ...jogador },
        inventario: JSON.parse(JSON.stringify(inventario)),
        inimigos: JSON.parse(JSON.stringify(inimigos))
    }
    console.log("Progresso salvo!")
}

function carregarProgresso() {
    if (estadoJogo) {
        jogador = estadoJogo.jogador
        inventario.length = 0
        inventario.push(...estadoJogo.inventario)
        inimigos.length = 0
        inimigos.push(...estadoJogo.inimigos)
        console.log("Progresso carregado!")
    } else {
        console.log("Nenhum progresso salvo para carregar.")
    }
}

function adicionarItemAoInventario() {
    const itemNome = prompt("Digite o nome do item: ")
    const itemQuantidade = parseInt(prompt("Digite a quantidade: "))
    
    if (isNaN(itemQuantidade) || itemQuantidade <= 0) {
        console.log("Quantidade inválida. Tente novamente.")
        return
    }

    const item = { nome: itemNome, quantidade: itemQuantidade }
    adicionarItem(item)
}

function jogo() {
    while (true) {
        console.log("\nEscolha uma ação:")
        console.log("1. Atacar um inimigo")
        console.log("2. Curar")
        console.log("3. Adicionar item ao inventário")
        console.log("4. Remover item do inventário")
        console.log("5. Exibir inventário")
        console.log("6. Exibir inimigos")
        console.log("7. Salvar progresso")
        console.log("8. Carregar progresso")
        console.log("0. Sair")

        const acao = prompt("Digite o número da ação: ")

        switch (acao) {
            case '1':
                const inimigoNome = prompt("Digite o nome do inimigo: ")
                const armaNome = prompt("Digite o nome da arma: ")
                atacar(inimigoNome, armaNome)
                break
            case '2':
                const quantidade = parseInt(prompt("Digite a quantidade de cura: "))
                if (isNaN(quantidade) || quantidade <= 0) {
                    console.log("Quantidade de cura inválida. Tente novamente.")
                    break
                }
                curar(quantidade)
                break
            case '3':
                adicionarItemAoInventario()
                break
            case '4':
                const itemNome = prompt("Digite o nome do item a remover: ")
                removerItem(itemNome)
                break
            case '5':
                exibirInventario()
                break
            case '6':
                exibirInimigos()
                break
            case '7':
                salvarProgresso()
                break
            case '8':
                carregarProgresso()
                break
            case '0':
                console.log("Saindo do jogo...")
                return
            default:
                console.log("Ação inválida. Tente novamente.")
        }
    }
}


jogo()
