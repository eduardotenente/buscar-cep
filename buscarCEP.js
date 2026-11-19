const formularioCEP = document.querySelector('#formularioCEP');
const cep = document.querySelector('#cep');

const estado = document.querySelector('#estado');
const cidade = document.querySelector('#cidade');
const bairro = document.querySelector('#bairro');
const endereco = document.querySelector('#endereço');
const situacao = document.querySelector('#situação');

formularioCEP.addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscarCEP();
});

async function buscarCEP() {
    try {
        const busca = await fetch('https://viacep.com.br/ws/CEP/json/');
        if(!busca.ok) {
            throw new Error('[O servidor se encontra indisponível no momento]: ', busca.status);
        }

        const local = await busca.json();
        console.log(local);

    } catch (error) {
        situacao.textContent = 'Não foi possível realizar a busca pelo CEP informado.', error.message;
    }
}