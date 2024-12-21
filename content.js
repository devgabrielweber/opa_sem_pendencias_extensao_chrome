if (document.readyState === "loading") {
    // DOM ainda não carregado
    document.addEventListener("DOMContentLoaded", executarScript);
} else {
    // DOM já carregado
    executarScript();
}

async function getDash() {
    response = await fetch("https://suporte.ixcsoft.com.br/dashboards/attendant", {
        credentials: 'include'
    })
    responseText = await response.text()
    return responseText
}

function executarScript() {

    const popup = document.createElement('div');
    popup.addEventListener('click', () => {
        popup.remove();
    });
    popupTimeout = 0
    popup.textContent = 'Você tem atendimentos não respondidos!';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.padding = '15px 20px';
    popup.style.backgroundColor = '#ff5722';
    popup.style.color = '#fff';
    popup.style.fontSize = '16px';
    popup.style.fontWeight = 'bold';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';
    popup.style.cursor = 'pointer';

    maior_q_zero = false
    popupTimeout = 40

    intervaloVerificar = setInterval(() => {

        let resposta = getDash().then((response) => {

            const parser = new DOMParser()

            htmlDash = parser.parseFromString(response, "text/html")

            // try {
            // iframe = document.getElementById('nextPage') //define a classe que quer pesquisar por
            // iframeDoc = iframe.contentDocument
            elem = htmlDash.querySelectorAll('[class="text-gray-1000 md:text-xl text-lg text-left font-bold truncate"]')
            elem3 = htmlDash.querySelectorAll('[class="flex w-full items-center p-8 justify-start bg-background-secondary rounded-xl border border-gray-400 cursor-pointer"]')
            console.log(elem[1])
            // } catch (error) {
            elem[1] = null
            elem3[1] = null
            // }
            //console.log(iframeDoc)
            elem2 = document.querySelector('[data-id="home"]'); //define a classe do ícone que quer modificar

            //console.log(elem2)
            //console.log(elem[0])
            if (elem[1] != null) { //se encontrar a classe

                //aqui, lembrar que pode retornar mais de um elem, usar o index pra escolher o certo

                //console.log('é diferente de null')
                //console.log(elem[1].innerHTML)
                if (parseFloat(elem[1].innerHTML) > 0) { //se o valor for maior que zero
                    maior_q_zero = true //maior que zero = true
                } else { // se for menor ou igual a zero
                    maior_q_zero = false //maior que zero = false
                }
            }

            if (maior_q_zero == true) { // se maior que zero = true
                //console.log('é maior que zero')
                //pode replicar o código abaixo para outros elementos,
                //mas é necessário busca-lo no inicio do cod
                elem2.animate([ //animar o ícone
                    { backgroundColor: 'red' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(5px)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { backgroundColor: 'orange' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(0)' },
                    { backgroundColor: 'red' }
                ], {
                    duration: 1500,//obrigatório, recomendo deixar como a duração do loop para não cortar a animação
                    iterations: 1
                })
                if (elem3[1] != null) {
                    elem3[1].animate([ //animar o ícone
                        { backgroundColor: 'red' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { backgroundColor: 'orange' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(0)' },
                        { backgroundColor: 'red' }
                    ], {
                        duration: 1500,//obrigatório, recomendo deixar como a duração do loop para não cortar a animação
                        iterations: 1
                    })
                }
                if (popupTimeout > 5) {
                    popupTimeout = 0
                    document.body.appendChild(popup)
                }
            } else {
                elem2.class = 'item'
                //console.log('pausou!')
            }
            popupTimeout += 1

            return response
        })
    }, 1500) //faz essa verificação a cada 1,5s, pode alterar, mas não recomedo (pode ser que a animação corte)

}
