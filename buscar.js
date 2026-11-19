const formularioCEP = document.querySelector('#formularioCEP');
const inputCep = document.querySelector('#cep');

const estado = document.querySelector('#estado');
const cidade = document.querySelector('#cidade');
const bairro = document.querySelector('#bairro');
const endereco = document.querySelector('#endereço');
const situacao = document.querySelector('#situação');

formularioCEP.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const cep = inputCep.value.replace(/\D/g, '');
    if(cep.length !== 8) {
        alert('Digite um CEP válido!');
        return;
    };

    try {
        const busca = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if(!busca.ok) {
            throw new Error('[O servidor se encontra indisponível no momento]: ', busca.status);
        }

        const dados = await busca.json();
    
        if(dados.erro) {
            alert('CEP não encontrado')
            limparFormulario();
            return;
        };

        estado.textContent = `Estado: ${dados.uf}`;
        cidade.textContent = `Cidade: ${dados.localidade}`;
        bairro.textContent = `Bairro: ${dados.bairro}`;
        endereco.textContent = `Rua: ${dados.logradouro}`;

        situacao.classList.add('mensagem');
        situacao.textContent = 'A busca pelo CEP foi um sucesso!';

        } catch (error) {
            situacao.textContent = 'Não foi possível realizar a busca pelo CEP informado.', error.message;
        }
});

situacao.classList.remove('mensagem')