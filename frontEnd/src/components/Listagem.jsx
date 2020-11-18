import React from 'react';
import TableLista from './TableLista';

function Listagem(props){

  function remove(id){
    props.remove(id);
  }
  return(
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Gerenciar <b>Usuários</b></h2>
              </div>
              <div className="col-sm-6">
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="w-25">Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Data de Criação</th>
                <th>Última Atualização</th>
                <th>Ações</th>
              </tr>
            </thead>
            <TableLista
              atualiza={props.atualiza}  
              remove={remove} 
              listaCompleta={props.listaCompleta} 
            />             
          </table>
        </div>
      </div>              
     </div>
  );
}

export default Listagem;