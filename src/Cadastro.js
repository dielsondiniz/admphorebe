import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      
    },
  },
}));


export default function Cadastro(props) {
    const classes = useStyles();
    /*const columns = [
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'adulto', headerName: 'Adultos', width: 130 },
        { field: 'crianca', headerName: 'Crianças', width: 130 },
        { field: 'obs', headerName: 'Observação', width: 130 }
      ];*/

      /*function salvar1() {
        let url = 'https://sheetdb.io/api/v1/b375knfkod0r3';
        fetch(url, { method: 'POST', body: {"data": [{"nome": nome, "adulto": adulto, "crianca": crianca, "data": "25/04/2020", "horario": props.culto, "obs": obs }]} }).then((response)=>
            console.log(response)
        )
      }*/
      const [nome, setNome] = useState("");
      const [adulto, setAdulto] = useState(0);
      const [crianca, setCrianca] = useState(0);
      const [obs, setObs] = useState("");     

      function salvar() {
        let url = 'https://sheetdb.io/api/v1/b375knfkod0r3';
        axios.post(url, {"data": {"nome": nome, "adulto": adulto, "crianca": crianca, "data": "25/04/2020", "horario": props.culto, "obs": obs }}).then((response)=>{
            props.loadCadastros();
            alert("obrigado por se cadastrar")
        }
        )
      }
    
    return (
        <>
        <div>
            <b>Preencha o formulário abaixo para informar sua participação no {props.culto}º culto</b>
        </div>

        <div style={{width: '800px', margin: 'auto', padding: '25px',background: 'rgb(243 243 243 / 80%)', boxShadow: '6px 6px 7px 4px rgb(97 97 97 / 77%)'}}>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField id="nome" value={nome} onChange={(event)=> setNome(event.target.value)} label="Nome: " helperText="digite o seu nome" variant="outlined" fullWidth />
            <TextField id="adulto" type='number' value={adulto} onChange={(event)=> setAdulto(event.target.value)} label="Adulto: " helperText="digite a quantidade de adultos incluindo você." variant="outlined" fullWidth />
            <TextField id="crianca"  type='number' value={crianca} onChange={(event)=> setCrianca(event.target.value)} label="Crianca: " helperText="digite a quantidade de crianças" variant="outlined" fullWidth />
            <TextField id="obs" value={obs} onChange={(event)=> setObs(event.target.value)} label="Obs: " variant="outlined" fullWidth />
            
            <Button onClick={()=>salvar()} variant="contained" color="primary" startIcon={<SaveIcon />} >
                Salvar
            </Button>
            </form>
        </div>

        <div style={{ width: '500px', margin: 'auto', marginTop: '25px', background: 'rgb(243 243 243 / 80%)' }}>
        <TableContainer>
            <Table  size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Adultos</TableCell>
                    <TableCell align="right">Crianças</TableCell>
                    <TableCell>Observação</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.lista.map((row) => (
                    <TableRow key={row.nome}>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell align="right">{row.adulto}</TableCell>
                    <TableCell align="right">{row.crianca}</TableCell>
                    <TableCell>{row.obs}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            
        </div>

        </>
    )
}