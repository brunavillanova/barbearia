// Função para enviar mensagem para o WhatsApp
function enviarWhatsApp() {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Número de telefone da barbearia (com DDD no formato internacional)
    const telefone = '5511971552389'; // Altere para o número correto

    // Formatar a mensagem para a URL
    const textoFormatado = `Olá, meu nome é ${nome}. ${mensagem}`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(textoFormatado)}`;

    // Redirecionar para o WhatsApp
    window.open(url, '_blank');
}
