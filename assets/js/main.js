function carregar(){
  const form = document.querySelector('.form');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const inputPeso   = e.target.querySelector('.peso');
    const inputAltura = e.target.querySelector('.altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if(!inputPeso.value){
      setResultado('Campo "peso" não pode estar vazio.', 'error');
      inputPeso.focus();
      return;
    }else if(!inputAltura.value){
      setResultado('Campo "altura" não pode estar vazio.', 'error');
      inputAltura.focus();
      return;
    }else if(!peso){
      setResultado('Valor inválido para o campo "peso".', 'error');
      inputPeso.focus();
      return;
    }else if(!altura){
      setResultado('Valor inválido para o campo "altura".', 'error');
      inputAltura.focus();
      return;
    }
    
    let imc = getImc(peso, altura);
    let mensagem = verificaNivelImc(imc);
    let resultado = `
      Peso: ${peso}, Altura: ${altura} <br/>
      IMC: <span>"${imc}"</span> | ${mensagem.message}
    `;

    setResultado(resultado, mensagem.type);
    inputPeso.focus();
    inputPeso.value = '';
    inputAltura.value = '';
  });

  function getImc(peso, altura){
    return (peso / altura ** 2).toFixed(2);
  }

  function verificaNivelImc(imc){
    const niveis = [
      'Está abaixo do peso', 'Está no peso ideal', 'Está em sobrepeso',
      'Está em obesidade 1° grau', 'Está em obesidade 2° grau', 'Está em obesidade 3° grau'
    ];

    if(imc > 39.9)
      return {message: niveis[5], type: 'error'};
    if(imc >= 34.9)
      return {message: niveis[4], type: 'error'};
    if(imc >= 29.9)
      return {message: niveis[3], type: 'error'};
    if(imc >= 24.9)
      return {message: niveis[2], type: 'alert'};
    if(imc >= 18.5)
      return {message: niveis[1], type: 'success'};
    if(imc < 18.5)
      return {message: niveis[0], type: 'error'};
  }

  function criarElemento(elemento){
    return document.createElement(elemento);
  }

  function setResultado(msg, classe){
    const resultado = document.querySelector('.resultado');
    const paragrafo = criarElemento('p');

    resultado.innerHTML = '';
    paragrafo.innerHTML = msg;
    paragrafo.classList = classe;
    resultado.appendChild(paragrafo);
  }
}
carregar();