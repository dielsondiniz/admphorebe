import React, { useState, useEffect } from 'react';

import { Container, TitleCulto, ContainerCulto, FlexContainer, Voltar } from './Styles';
import GlobalStyle from './styles/Styles';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Button from '@material-ui/core/Button';
import Cadastro from './Cadastro';
function App() {
  const SELECIONAR = 0;
  //const PRIMEIRO = 1;
  //const SEGUNDO = 2;

  //const VAGASTOTAIS = 33;

  const [culto, setCulto] = useState(SELECIONAR);
  const [countCulto1, setCountCulto1] = useState(0);
  const [countCulto2, setCountCulto2] = useState(0);

  const [cadastros1, setCadastros1] = useState([]);
  const [cadastros2, setCadastros2] = useState([]);

  const [data, setData] = useState('25/04/2021');
  const [nomeCulto, setNomeCulto] = useState("Culto do Círculo de Oração");
  const [direcao1, setDirecao1] = useState("Liderança Círculo de Oração");
  //const [direcao2, setDirecao2] = useState("Liderança Círculo de Oração");
  const [banda1, setBanda1] = useState("Expressão de Louvor");
  //const [banda2, setBanda2] = useState("Expressão de Louvor");
  //const [preletor1, setPreletor1] = useState("Pr. João Wagner");
  //const [preletor2, setPreletor2] = useState("Pr. João Wagner");
  const [vagas1, setVagas1] = useState(50);
  const [vagas2, setVagas2] = useState(50);
 
  useEffect(() => {
    loadCadastros();
    loadInfos();
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
  function loadInfos(){
    let url = 'https://sheetdb.io/api/v1/b375knfkod0r3?sheet=culto';
    fetch(url, { method: 'GET', headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(function(response){
      response.json().then(function (datas) {
        let data = datas[0];
        setData(data.data)
        setNomeCulto(data.nomeCulto1)
        setDirecao1(data.direcao1)
        //setDirecao2(data.direcao2)
        setBanda1(data.banda1)
        //setBanda2(data.banda2)
        //setPreletor1(data.preletor1)
        //setPreletor2(data.preletor2)
        setVagas1(data.vagas1)
        setVagas2(data.vagas2)

      });
    })
  }

  return (
    <>
    <Container>
      <TitleCulto>{nomeCulto} - {data}</TitleCulto>
      {culto !== SELECIONAR && 
      <Voltar>

        <Button
        onClick={()=>setCulto(SELECIONAR)}
        variant="contained"
        
        startIcon={<KeyboardReturnIcon />}
      >
        Voltar
      </Button>
      </Voltar>
      }
      {culto === SELECIONAR ? 
      <>
            { vagas2 + vagas1 - countCulto2 - countCulto1 <= 0 &&
              <span style={{color: 'red'}}><i>Obs.: Continue fazendo seu cadastro, nós iremos verificar a possibilidade de realizar um terceiro culto</i></span>
            }    
            <h2 style={{textAlign: 'center'}}><b>Cadastro não necessário esse domingo - "Em experiência"</b><br/></h2>
            
        <FlexContainer>
          <ContainerCulto>
            <h4 style={{textAlign: 'center'}}><b>Culto Único </b><br/></h4>
            <b>Horario:</b> 18:00 às 19:30<br/>
            
            <b>Direção:</b> {direcao1}<br/>
            <b>Banda:</b> {banda1}<br/>
            {/*<b>Preletor:</b> {preletor1}<br/>*/}
            <span style={{color: 'red'}}><b>Vagas:</b> {vagas1 - countCulto1}</span>
          </ContainerCulto>
          {/*
          <ContainerCulto onClick={()=> setCulto(SEGUNDO)}>
            <h4 style={{textAlign: 'center'}}><b>2° Culto </b><br/></h4>
            <b>Horario:</b> 19:30 às 20:30<br/>
            
            <b>Direção:</b> {direcao2}<br/>
            <b>Banda:</b> {banda2}<br/>
            {//<b>Preletor:</b> {preletor2}<br/>
            }
            <span style={{color: 'red'}}><b>Vagas:</b> {vagas2 - countCulto2}</span>
           
          </ContainerCulto>*/}
        </FlexContainer>
          <span style={{color: 'red'}}>
            {//<i>OBSERVAÇÃO: Favor preencher a lista, mesmo que já tenha ultrapassado o número de vagas. Havendo um determinado número de pessoas impossibilitadas de participar dos cultos, buscaremos uma alternativa para que você não seja prejudicado. Como por exemplo a possibilidade de um terceiro culto.</i>
            }
            {//<i>OBSERVAÇÃO: Caso já tenha excedido a quantidade de vagas, preencha a lista da mesma forma, assim faremos a transmissão do culto e o membro que não conseguiu participar do culto e tiver preenchido a lista tera preferencia na participação do proximo culto</i>
            }
            <i>OBSERVAÇÃO: Esse domingo não será necessário realizar cadastro para participação no culto</i>
          </span>
        </>
        :
        <Cadastro culto={culto} lista={culto === 1? cadastros1: cadastros2} loadCadastros={()=>loadCadastros()} dataCulto={data} vagas={culto === 1? vagas1 - countCulto1: vagas2 - countCulto2} />
      }
    <GlobalStyle/>
    </Container>
      </>
  );
}

export default App;
