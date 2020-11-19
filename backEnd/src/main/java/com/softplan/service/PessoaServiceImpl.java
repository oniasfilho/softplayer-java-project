package com.softplan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.softplan.dao.PessoaDAO;
import com.softplan.entity.Pessoa;

@Service
public class PessoaServiceImpl implements PessoaService {
	
	// injetar pessoaDAO via construtor
	private PessoaDAO pessoaDAO;
	
	@Autowired
	public PessoaServiceImpl(PessoaDAO dao) {
		pessoaDAO = dao;
	}
	
	@Override
	@Transactional
	public List<Pessoa> listaTodos() {
		return pessoaDAO.listaTodos();
	}

	@Override
	@Transactional
	public Pessoa buscarPorId(int id) {
		return pessoaDAO.buscarPorId(id);
	}

	@Override
	@Transactional
	public void gravar(Pessoa pessoa) {
		try {
			pessoaDAO.gravar(pessoa);
		} catch (Exception e) {
			
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF já cadastrado", e.getCause());
		}
	}

	@Override
	@Transactional
	public void deletaPorId(int id) {
		pessoaDAO.deletaPorId(id);
	}

}
