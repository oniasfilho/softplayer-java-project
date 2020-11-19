package com.softplan.service;

import java.util.List;

import com.softplan.entity.Pessoa;

public interface PessoaService {
	
	public List<Pessoa> listaTodos();
	
	public Pessoa buscarPorId(int id);
	
	public void gravar(Pessoa pessoa);
	
	public void deletaPorId(int id);

}
