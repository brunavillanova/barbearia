Documentação para o Sistema de Agendamento da Barbearia Crazy
Visão Geral

Este documento descreve a implementação do sistema de agendamento via WhatsApp para a Barbearia Crazy, incluindo a função JavaScript principal e seus componentes relacionados.
Função Principal: enviarWhatsApp()
Propósito

Enviar uma mensagem pré-formatada para o WhatsApp da barbearia com os dados do cliente, facilitando o agendamento de serviços.
Parâmetros

A função não recebe parâmetros diretamente, mas obtém seus valores dos elementos HTML com os seguintes IDs:

    nome: Campo de texto com o nome do cliente

    telefone: Campo de telefone (opcional)

    mensagem: Campo de texto com a mensagem personalizada

Fluxo de Execução

    Obtenção dos valores:

        Captura os valores dos campos do formulário

        Aplica .trim() para remover espaços desnecessários

    Validações:

        Verifica se o nome foi preenchido

        Confere se a mensagem foi personalizada (não é o texto padrão)

        Valida o formato do telefone (se fornecido)

    Formatação:

        Limpa o número de telefone, removendo caracteres não numéricos

        Monta a mensagem final combinando nome, mensagem e telefone

    Envio:

        Codifica a mensagem para URL

        Abre o WhatsApp em nova aba com a mensagem pré-preenchida

Código Fonte
javascript
Copy

function enviarWhatsApp() {
    try {
        // Obtenção dos valores
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validações
        if (!nome) throw new Error('Por favor, digite seu nome');
        if (!mensagem || mensagem === 'Olá, gostaria de agendar um horário!') {
            throw new Error('Por favor, personalize sua mensagem');
        }
        
        // Formatação do telefone
        const numeroLimpo = telefone.replace(/\D/g, '');
        const mensagemCompleta = `Olá, sou ${nome}. ${mensagem}` + 
                               (numeroLimpo ? `\nMeu telefone: ${telefone}` : '');
        
        // Configuração do WhatsApp
        const numeroBarbearia = '11971552389'; // Número oficial da barbearia
        const urlWhatsApp = `https://wa.me/55${numeroBarbearia}?text=${encodeURIComponent(mensagemCompleta)}`;
        
        // Envio
        window.open(urlWhatsApp, '_blank');
        
    } catch (error) {
        console.error('Erro no agendamento:', error);
        alert(error.message);
    }
}

Função Auxiliar: Máscara de Telefone
Propósito

Aplicar formatação automática ao campo de telefone durante a digitação.
Implementação
javascript
Copy

document.getElementById('telefone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    // Aplica a máscara: (XX) XXXXX-XXXX
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d)(\d{4})$/, '$1-$2');
    
    e.target.value = value;
});

Estrutura HTML Requerida
html
Copy

<form id="whatsappForm">
    <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
    </div>
    <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone">
    </div>
    <div class="form-group">
        <label for="mensagem">Mensagem:</label>
        <textarea id="mensagem" name="mensagem" required>Olá, gostaria de agendar um horário!</textarea>
    </div>
    <button type="button" onclick="enviarWhatsApp()">Enviar Mensagem</button>
</form>

Run HTML
Tratamento de Erros

A função possui três níveis de tratamento de erros:

    Validação de campos: Verifica se os dados obrigatórios foram preenchidos corretamente

    Try-Catch: Captura erros inesperados durante a execução

    Feedback visual: Exibe mensagens de alerta para o usuário quando ocorrem problemas

Dependências

    Nenhuma biblioteca externa é necessária

    Requer navegadores modernos com suporte a:

        Template strings

        Arrow functions

        Métodos de string como trim() e replace()

Considerações de Segurança

    Dados sensíveis:

        O número da barbearia está hardcoded no JavaScript

        Recomenda-se implementar proteção contra scraping se necessário

    Validação:

        A validação ocorre no client-side

        Recomenda-se validação adicional no server-side para uso em sistemas mais complexos

Versão

1.0.0 - Implementação inicial
Autor

Sistema desenvolvido para Barbearia Crazy
Licença

Uso exclusivo para Barbearia Crazy
