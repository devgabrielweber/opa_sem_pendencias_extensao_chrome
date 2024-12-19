if (document.readyState === "loading") {
    // DOM ainda não carregado
    document.addEventListener("DOMContentLoaded", executarScript);
} else {
    // DOM já carregado
    executarScript();
}

function executarScript() {

    maior_q_zero = false

    intervaloVerificar = setInterval(() => {

        elem = document.getElementsByClassName("classe-teste") //define a classe que quer pesquisar por
        elem2 = document.getElementsByClassName("classe-modificada") //define a classe do ícone que quer modificar

        if (elem[0] != null) { //se encontrar a classe

            //aqui, lembrar que pode retornar mais de um elem, usar o index pra escolher o certo

            //console.log('é diferente de null')
            if (parseFloat(elem[0].innerHTML) > 0) { //se o valor for maior que zero
                maior_q_zero = true //maior que zero = true
            } else { // se for menor ou igual a zero
                maior_q_zero = false //maior que zero = false
            }
        }

        if (maior_q_zero == true) { // se maior que zero = true

            //pode replicar o código abaixo para outros elementos,
            //mas é necessário busca-lo no inicio do cod

            elem2[0].style.color = 'red' //aqui, alterar o ícone de alguma forma 
            elem2[0].animate([ //animar o ícone
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 1500,//obrigatório, recomendo deixar como a duração do loop para não cortar a animação
                iterations: 1
            })
        } else {
            elem2[0].style.color = 'black'
            //console.log('pausou!')
        }
    }, 1500) //faz essa verificação a cada 1,5s, pode alterar, mas não recomedo (pode ser que a animação corte)
}
