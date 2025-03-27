if (document.readyState === "loading") {
    // DOM ainda não carregado
    document.addEventListener("DOMContentLoaded", executarScript);
} else {
    // DOM já carregado
    executarScript();
}

let indexPadrao = 1;

async function geraDash() {
    try {
        const retornoMSG = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: "inicia_monitoramento" }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError); // Trata erros
                } else if (!response || !response[0].html) {
                    reject(new Error("Resposta inválida ou vazia.")); // Verifica a resposta
                } else {
                    resolve(response); // Resolve a resposta
                }
            });
        });

        //console.log(retornoMSG)

        dash = retornoMSG[0];
        if (retornoMSG[1] == 'https://suporte.ixcsoft.com.br/dashboards/manager') {
            indexPadrao = 2;
        } else {
            indexPadrao = 1;
        }

        //console.log(dash.html); // Exibe o HTML capturado
        return dash.html;
    } catch (error) {
        console.error("Erro ao capturar o HTML:", error.message); // Trata erros
    }
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

        //console.log(indexPadrao)

        let resposta = geraDash().then((response) => {

            const parser = new DOMParser()

            htmlDash = parser.parseFromString(response, "text/html");
            htmlDash2 = htmlDash.documentElement.outerHTML;
            htmlDashFinal = parser.parseFromString(htmlDash2, "text/html");
            //console.log(htmlDashFinal)
            try {
                iframe = document.getElementById('nextPage') //define a classe que quer pesquisar por
                //console.log(iframe)
                deuerroiframe = false
                try {
                    iframeDoc = iframe.contentDocument
                } catch (e) {
                    deuerroiframe = true
                    //console.log('erro ao capturar aiframe!')
                }
                AguardandoAtendenteDash = htmlDashFinal.querySelectorAll('[class="text-gray-1000 md:text-xl text-lg text-left font-bold truncate"]')
                const query = ''
                if (deuerroiframe == false) {
                    if (indexPadrao == 1) {
                        aguardandoAtendendeIframe = iframeDoc.querySelectorAll("[class='flex w-full items-center p-8 justify-start bg-background-secondary rounded-xl border border-gray-400 cursor-pointer']")
                    } else if (indexPadrao == 2) {
                        aguardandoAtendendeIframe = iframeDoc.querySelectorAll('[class="flex w-full items-center p-8 justify-start bg-background-secondary rounded-xl border border-gray-400"]')

                    }
                    aguardandoAtendendeIframe = iframeDoc.querySelectorAll(query)
                } else {
                    aguardandoAtendendeIframe[indexPadrao] = null
                }
                //console.log(AguardandoAtendenteDash[indexPadrao])
            } catch (error) {
                //console.log('erro ao capturar iframe')
                AguardandoAtendenteDash[indexPadrao] = null
                aguardandoAtendendeIframe[indexPadrao] = null
            }
            iconeHomeOpaPagPrincipal = document.querySelector('[data-id="home"]'); //define a classe do ícone que quer modificar

            if (AguardandoAtendenteDash[indexPadrao] != null) { //se encontrar a classe
                if (parseFloat(AguardandoAtendenteDash[indexPadrao].innerHTML) > 0) { //se o valor for maior que zero
                    maior_q_zero = true //maior que zero = true
                } else { // se for menor ou igual a zero
                    maior_q_zero = false //maior que zero = false
                }
            }

            if (maior_q_zero == true) { // se maior que zero = true
                //pode replicar o código abaixo para outros elementos,
                //mas é necessário busca-lo no inicio do cod
                iconeHomeOpaPagPrincipal.animate([ //animar o ícone
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
                if (aguardandoAtendendeIframe[indexPadrao] != null) {
                    aguardandoAtendendeIframe[indexPadrao].animate([ //animar o ícone
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
                //iconeHomeOpaPagPrincipal.class = 'item'
                //console.log('pausou!')
            } https://docs.google.com/spreadsheets/d/1ow4FstI_I_kzBd1ib8MGXq-SZ37J1M2T8004u_MhH2I/edit?gid=0#gid=0
            popupTimeout += 1

            return response
        })
    }, 1500) //faz essa verificação a cada 1,5s, pode alterar, mas não recomedo (pode ser que a animação corte)
}