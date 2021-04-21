import React, { useState } from 'react';
import FormItem from './FormItem';
import { DataGrid } from '@material-ui/data-grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
export default function Cadastro(props) {
    const columns = [
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'adulto', headerName: 'Adultos', width: 130 },
        { field: 'crianca', headerName: 'Crianças', width: 130 },
        { field: 'obs', headerName: 'Observação', width: 130 }
      ];

      const [nome, setNome] = useState("");
      const [adulto, setAdulto] = useState(0);
      const [crianca, setCrianca] = useState(0);
      const [obs, setObs] = useState("");     

      /*function salvar1() {
        let url = 'https://sheetdb.io/api/v1/b375knfkod0r3';
        fetch(url, { method: 'POST', body: {"data": [{"nome": nome, "adulto": adulto, "crianca": crianca, "data": "25/04/2020", "horario": props.culto, "obs": obs }]} }).then((response)=>
            console.log(response)
        )
      }*/
      function salvar() {
        let url = 'https://sheetdb.io/api/v1/b375knfkod0r3';
        axios.post(url, {"data": {"nome": nome, "adulto": adulto, "crianca": crianca, "data": "25/04/2020", "horario": props.culto, "obs": obs }}).then((response)=>
            console.log(response)
        )
      }
    
    return (
        <>
        <div>
            Preencha o formulário abaixo para informar sua participação no {props.culto}º culto
        </div>

        <div>
            <FormItem label='Digite seu nome'>
                <input type='text' value={nome} onChange={(event)=> setNome(event.target.value)} />
            </FormItem>
            <FormItem label='Numero de adultos'>
                <input type='number' value={adulto} onChange={(event)=> setAdulto(event.target.value)} />
            </FormItem>
            <FormItem label='Numero de crianças'>
                <input type='number' value={crianca} onChange={(event)=> setCrianca(event.target.value)} />
            </FormItem>
            <FormItem label='Observação:'>
                <input type='text' value={obs} onChange={(event)=> setObs(event.target.value)} />
            </FormItem>
            <div onClick={()=>salvar()}>Salvar</div>
        </div>

        <div style={{ height: 400, width: '100%' }}>
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
                    <TableCell align="right">{row.adulto}</TableCell>
                    <TableCell align="right">{row.crianca}</TableCell>
                    <TableCell>{row.obs}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <DataGrid rows={props.lista} columns={columns} pageSize={5} checkboxSelection />
        </div>

        </>
    )
}