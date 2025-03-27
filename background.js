let htmlContent = ""; // Variável para armazenar o HTML
let reloadTimeout = 0;
// Função para capturar o HTML
function capturaHTML(tabId, callback) {
    if (reloadTimeout >= 7) { //seta um timeout para recarregar a página
        chrome.tabs.reload(tabId);
        reloadTimeout = 0
    }

    chrome.scripting.executeScript( //executa o script no próprio chrome, não em uma página específica
        {
            target: { tabId: tabId },//define em qual página no script deve ser executado
            func: () => {//define a função como uma função para capturar o script
                try {
                    return document.documentElement.outerHTML; // Captura o HTML
                } catch (e) {
                    console.error("Erro ao capturar HTML:", e);
                    return null;
                }
            },
        },
        (results) => {
            if (chrome.runtime.lastError) {
                console.error("Erro ao executar script:", chrome.runtime.lastError.message);
                callback(null); // Retorna null em caso de erro
            } else if (results && results[0] && results[0].result) {
                htmlContent = results[0].result; // Atualiza o HTML
                //console.log("HTML capturado com sucesso!");
                callback(htmlContent); // Retorna o HTML capturado
            } else {
                console.error("Erro: Nenhum resultado retornado.");
                callback(null);
            }
        }
    );
    reloadTimeout += 1
}

// Função para abrir ou monitorar a guia
async function openAndMonitorTab(url, callback) {
    chrome.tabs.query({ url: "https://suporte.ixcsoft.com.br/auth/login" }, (response) => {
        if (response.length > 0) {
            chrome.tabs.query({ url: "https://suporte.ixcsoft.com.br/atendente/" }, (response2) => {
                chrome.tabs.reload(response2[0].id)
            })
            chrome.tabs.reload(response[0].id)
        } else {
            chrome.tabs.query({ url: url }, (resp) => {
                if (resp.length > 0) {
                    capturaHTML(resp[0].id, callback); // Captura HTML da guia existente
                } else {
                    chrome.tabs.create({ url: url }, (tab) => {
                        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                            if (tabId === tab.id && info.status === "complete") {
                                chrome.tabs.onUpdated.removeListener(listener); // Remove o ouvinte
                                chrome.tabs.update(tabId, { pinned: true });
                                capturaHTML(tab.id, callback); // Captura o HTML após carregamento
                            }
                        });
                    });
                }
            });
        }
    })
}

// Listener para mensagens
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "inicia_monitoramento") {
        chrome.tabs.query({ url: 'https://suporte.ixcsoft.com.br/dashboards/manager' }, (tabManager) => {
            let url = 'https://suporte.ixcsoft.com.br/dashboards/attendant'; // Padrão é attendant

            if (tabManager.length > 0) {
                url = 'https://suporte.ixcsoft.com.br/dashboards/manager'; // Se manager existir, usa ele
            }

            openAndMonitorTab(url, (html) => {
                if (html) {
                    sendResponse([{ html }, url]); // Envia o HTML capturado
                } else {
                    sendResponse({ error: "Erro ao capturar HTML." });
                }
            });
        });

        return true; // Mantém o canal aberto
    }
}); 