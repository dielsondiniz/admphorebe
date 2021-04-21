import React, { useState, useEffect } from 'react';

import Cadastro from './Cadastro';
function App() {
  const SELECIONAR = 0;
  const PRIMEIRO = 1;
  const SEGUNDO = 2;

  const VAGASTOTAIS = 33;

  const [culto, setCulto] = useState(SELECIONAR);
  const [countCulto1, setCountCulto1] = useState(0);
  const [countCulto2, setCountCulto2] = useState(0);

  const [cadastros1, setCadastros1] = useState([]);
  const [cadastros2, setCadastros2] = useState([]);
 
  useEffect(() => {
    loadCadastros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

  function loadCadastros(){
    let url = 'https://sheetdb.io/api/v1/b375knfkod0r3';
    fetch(url, { method: 'GET', headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(function(response){
      response.json().then(function (data) {
        setCadastros1(data.filter((lista) => {return Number(lista.horario) === 1}));
        setCadastros2(data.filter((lista) => {return Number(lista.horario) === 2}));
        setCountCulto1(data.filter((lista) => {return Number(lista.horario) === 1}).reduce((sum, list)=> { return (sum + (list.adulto*1) + (list.crianca*1))},0));
        setCountCulto2(data.filter((lista) => {return Number(lista.horario) === 2}).reduce((sum, list)=> { return (sum + (list.adulto*1) + (list.crianca*1))},0));

      });
    })
  }

  return (
    <div>
      <h1>Culto de Jovens e Adolescentes 18/04/2021</h1>
      {culto !== SELECIONAR && <div onClick={()=>setCulto(SELECIONAR)}>Voltar</div>}
      {culto === SELECIONAR ? 
        <div>    
          <div onClick={()=> setCulto(PRIMEIRO)}>
            1° Culto 
            Horario: 17:00 às 18:00
            Direção: Liderança dos Adolescentes
            Banda: Expressão de Louvor
            Preletor: Pastor João Wagner
            Vagas: {VAGASTOTAIS - countCulto1}
          </div>
          <div onClick={()=> setCulto(SEGUNDO)}>
            2° Culto 
            Horario: 18:30 às 19:30
            Direção: Liderança dos Jovens
            Banda: Expressão de Louvor
            Preletor: Dc. Elon
            Vagas: {VAGASTOTAIS - countCulto2}
          </div>
        </div>
        :
        <Cadastro culto={culto} lista={culto === 1? cadastros1: cadastros2} />
      }

    </div>
    
  );
}

export default App;
