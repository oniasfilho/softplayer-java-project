package com.softplan.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@Table(name="pessoa")
public class Pessoa {
		//definir campos
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id", unique=true)
		private int id;
		@NotNull(message="campo obrigatório")
		@NotEmpty(message="nome nao pode estar vazio")
		@Size(max=25, message="nome nao pode conter mais de 25 caracteres.")
		private String nome;
		@Size(max=1, message="valor invalido (0 para indefinido, 1 para masculino, 2 para feminino")
		private String sexo;
		@Email(message="email deve ser válido")
		private String email;
		@Column(name="data_de_nascimento")
		@NotNull(message="campo obrigatório")
		@Past(message="favor inserir uma data de nascimento válida (dd/MM/aaaa)")
		@JsonDeserialize(as =LocalDate.class)
	    @JsonFormat(pattern="dd/MM/yyyy")
		private LocalDate dataDeNascimento;
		@Size(max=25, message="naturalidade nao pode conter mais de 25 caracteres.")
		private String naturalidade;
		@Size(max=25, message="nacionalidade nao pode conter mais de 25 caracteres.")
		private String nacionalidade;
		@Pattern(regexp="^[0-9]{11}$",
				message="valor invalido (deve conter 11 digitos numericos, ex:11122233344)")
		@NotNull(message="campo obrigatório")
		@Column(name="cpf", unique=true)
		private String cpf;
		@Column(name="data_de_criacao")
		@JsonFormat(pattern="dd/MM/yyyy")
		@CreationTimestamp
		private LocalDate dataDeCriacao;
		@Column(name="ultima_atualizacao")
		@JsonFormat(pattern="dd/MM/yyyy HH:mm" , locale = "pt-BR", timezone = "Brazil/East")
		@UpdateTimestamp
		private Timestamp ultimaAtualizacao;
		
		//definir construtores
		
		public Pessoa() {

		}
		
		public Pessoa(String nome, String sexo, String email, String dataDeNascimento, String naturalidade,
				String nacionalidade, String cpf) {
			this.nome = nome;
			this.sexo = sexo;
			this.email = email;
			this.naturalidade = naturalidade;
			this.nacionalidade = nacionalidade;
			this.cpf = cpf;
		}
		
		//definir getters/setters
		
		public String getNome() {
			return nome;
		}
		public void setNome(String nome) {
			this.nome = nome;
		}
		public String getSexo() {
			return sexo;
		}
		public void setSexo(String sexo) {
			this.sexo = sexo;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public LocalDate getDataDeNascimento() {
			return dataDeNascimento;
		}
		public void setDataDeNascimento(LocalDate dataDeNascimento) {
			this.dataDeNascimento = dataDeNascimento;
		}
		public String getNaturalidade() {
			return naturalidade;
		}
		public void setNaturalidade(String naturalidade) {
			this.naturalidade = naturalidade;
		}
		public String getNacionalidade() {
			return nacionalidade;
		}
		public void setNacionalidade(String nacionalidade) {
			this.nacionalidade = nacionalidade;
		}
		public String getCpf() {
			return cpf;
		}
		public void setCpf(String cpf) {
			this.cpf = cpf;
		}
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}
		
		public LocalDate getDataDeCriacao() {
			return dataDeCriacao;
		}

		public Timestamp getUltimaAtualizacao() {
			return ultimaAtualizacao;
		}

		
		//definir metodo toString
		
		@Override
		public String toString() {
			return "Pessoa [id=" + id + ", nome=" + nome + ", sexo=" + sexo + ", email=" + email + ", dataDeNascimento="
					+ dataDeNascimento + ", naturalidade=" + naturalidade + ", nacionalidade=" + nacionalidade
					+ ", cpf=" + cpf + ", dataDeCriacao=" + dataDeCriacao + ", ultimaAtualizacao=" + ultimaAtualizacao
					+ "]";
		}

}
