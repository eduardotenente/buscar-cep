const formularioCEP = document.querySelector('#formularioCEP');
const cepInput = document.querySelector('#cep');
const cep = cepInput.value;

const estado = document.querySelector('#estado');
const cidade = document.querySelector('#cidade');
const bairro = document.querySelector('#bairro');
const endereco = document.querySelector('#endereço');
const situacao = document.querySelector('#situação');

formularioCEP.addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscarCEP(cep);
});

async function buscarCEP(cepInformado) {
    try {
        const busca = await fetch(`https://viacep.com.br/ws/${cepInformado}/json/`);
        if(!busca.ok) {
            throw new Error('[O servidor se encontra indisponível no momento]: ', busca.status);
        }

        const local = await busca.json();
        const informacoes = {
            estadoCEP: '',
            cidadeCEP: '',
            bairroCEP: '',
            enderecoCEP: '' 
        };

        const pegarInformacoes = local.forEach(local => {
            if(local.state) {
                informacoes.estadoCEP = local.state;
            }

            if(local.city) {
                informacoes.cidadeCEP = local.city;
            }

            if(local.neighborhood) {
                informacoes.bairroCEP = local.neighborhood;
            }

            if(local.address) {
                informacoes.enderecoCEP = local.address;
            }
        });
        console.log(informacoes);

        situacao.textContent = 'A busca pelo CEP foi um sucesso!';

    } catch (error) {
        situacao.textContent = 'Não foi possível realizar a busca pelo CEP informado.', error.message;
    }
}