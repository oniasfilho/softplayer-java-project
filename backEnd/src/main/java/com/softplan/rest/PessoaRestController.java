package com.softplan.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.softplan.entity.Pessoa;
import com.softplan.service.PessoaService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api" )
public class PessoaRestController {
	
	private PessoaService pessoaService; 
	 
	// injetar pessoa DAO diretamente
	@Autowired
	public PessoaRestController(PessoaService pessoaService) {
		this.pessoaService = pessoaService;
	}
	// criar endpoint "/pessoas" que retorna a lista de pessoas
	@GetMapping("/pessoas")
	public List<Pessoa> listaTodos(){
		return pessoaService.listaTodos();
	}
	
	// criar endpoint para GET/pessoas/{id}
	@GetMapping("/pessoas/{id}")
	public Pessoa getPessoa(@PathVariable int id) {
		Pessoa pessoa = pessoaService.buscarPorId(id);
		if (pessoa == null) {
			throw new RuntimeException("Pessoa com id buscado nao encontrado - " + id);
		}	
		return pessoa;
	}
	// criar endpoint para POST/pessoas (cadastrar usuario)
	
	@PostMapping("/pessoas")
	public ResponseEntity<String> cadastraPessoa(@RequestBody @Valid Pessoa pessoa) {
		//id é setado para 0, precaução caso o usuario envie o id no JSON
		pessoa.setId(0);		
		
		
		
		pessoaService.gravar(pessoa);
		
		return ResponseEntity.ok("Valido");	
	}
	
	//criar endpoint para PUT/pessoas (atualizar usuario)
	
	@PutMapping("/pessoas")
	public Pessoa atualizaPessoa(@RequestBody @Valid Pessoa pessoa) {	
		pessoaService.gravar(pessoa);
		return pessoa;
	}
	
	@DeleteMapping("/pessoas/{id}")
	public String deletePessoa(@PathVariable int id) {
		Pessoa pessoa = pessoaService.buscarPorId(id);
		
		if(pessoa == null) {
			throw new RuntimeException("Pessoa nao encontrada - " + id);
		}
		
		pessoaService.deletaPorId(id);
		
		return "Registro deletado com sucesso - " + id;
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(
	  MethodArgumentNotValidException ex) {
	    Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.put(fieldName, errorMessage);
	    });
	    return errors;
	}
}























