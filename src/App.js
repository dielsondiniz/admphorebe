import React, { useState, useEffect } from 'react';

import { Container, TitleCulto, ContainerCulto, FlexContainer } from './Styles';

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
    <>
    <Container>
      <TitleCulto>Culto do Circulo de Oração 25/04/2021</TitleCulto>
      {culto !== SELECIONAR && <div onClick={()=>setCulto(SELECIONAR)}>Voltar</div>}
      {culto === SELECIONAR ? 
        <FlexContainer>    
          <ContainerCulto onClick={()=> setCulto(PRIMEIRO)}>
            <h4 style={{textAlign: 'center'}}><b>1° Culto </b><br/></h4>
            <b>Horario:</b> 17:00 às 18:00<br/>
            <b>Direção:</b> Liderança dos Adolescentes<br/>
            <b>Banda:</b> Expressão de Louvor<br/>
            <b>Preletor:</b> Pastor João Wagner<br/>
            <span style={{color: 'red'}}><b>Vagas:</b> {VAGASTOTAIS - countCulto1}</span>
          </ContainerCulto>
          <ContainerCulto onClick={()=> setCulto(SEGUNDO)}>
            <h4 style={{textAlign: 'center'}}><b>2° Culto </b><br/></h4>
            <b>Horario:</b> 18:30 às 19:30<br/>
            <b>Direção:</b> Liderança dos Adolescentes<br/>
            <b>Banda:</b> Expressão de Louvor<br/>
            <b>Preletor:</b> Pastor João Wagner<br/>
            <span style={{color: 'red'}}><b>Vagas:</b> {VAGASTOTAIS - countCulto2}</span>
          </ContainerCulto>
        </FlexContainer>
        :
        <Cadastro culto={culto} lista={culto === 1? cadastros1: cadastros2} />
      }

    </Container>
      </>
  );
}

export default App;
