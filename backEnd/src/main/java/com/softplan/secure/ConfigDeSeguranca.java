package com.softplan.secure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class ConfigDeSeguranca extends WebSecurityConfigurerAdapter {

	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors().and()
			.csrf().disable()
			.authorizeRequests()
			.antMatchers("/source").permitAll()
			.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.anyRequest().authenticated()
			.and()
			.httpBasic()
				.authenticationEntryPoint(new SemPopUp());
	}
	
	
	@Bean
	@Override
	public UserDetailsService userDetailsService() {
			UserDetails user =
					User.withDefaultPasswordEncoder()
					.username("softplan")
					.password("12345")
					.roles("USER")
					.build();
			return new InMemoryUserDetailsManager(user);
		
	}
	
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/**.html", "/api-docs", "/webjars/**", "/configuration/**", "swagger-resources/**");
	}
}
