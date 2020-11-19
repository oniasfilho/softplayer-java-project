package com.softplan.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softplan.entity.Pessoa;

@Repository
public class PessoaDAOHibernateImpl implements PessoaDAO{

	// definir campo para entityManager
	private EntityManager entityManager;
	
	// injetar via construtor (prefiro pelo construtor pra facilitar a interpretação do código)
	@Autowired
	public PessoaDAOHibernateImpl(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	
	@Override
	public List<Pessoa> listaTodos() {
		
		// obter a sessao atual do hibernate
		Session currentSession = entityManager.unwrap(Session.class);
		
		// criar uma query
		Query<Pessoa> query = 
				currentSession.createQuery("from Pessoa", Pessoa.class);
		
		//executar a query e obter a result list
		List<Pessoa> pessoas = query.getResultList();
		
		//devolver a lista
		return pessoas;
	}

	@Override
	public Pessoa buscarPorId(int id) {
		// obter a hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// obter a pessoa
		Pessoa pessoa = 
				currentSession.get(Pessoa.class, id);
				
		// retornar a pessoa
		return pessoa;
	}


	@Override
	public void gravar(Pessoa pessoa) {
		// obter a hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		//gravar pessoa
		currentSession.saveOrUpdate(pessoa);
	}


	@Override
	public void deletaPorId(int id) {
		// obter a hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// deletar a partir do primary key
		Query<?> q = 
				currentSession.createQuery(
						"delete from Pessoa where id=:pessoaId");
		q.setParameter("pessoaId", id);
		
		q.executeUpdate();
	}
	
	

}
