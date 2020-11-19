package com.softplan.rest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@CrossOrigin("*")
public class RedirectsControllers {
	
	@RequestMapping("/source")
	public void redirectParaSource(HttpServletResponse res) {
		
	    res.setHeader("Location", "https://github.com/oniasfilho/softplayer-java-project");
	    res.setStatus(302);
	
	}
	
	@RequestMapping("/telaCadastro")
    public RedirectView redirectWithUsingRedirectView(
      RedirectAttributes attributes) {
        attributes.addFlashAttribute("flashAttribute", "redirectWithRedirectView");
        attributes.addAttribute("attribute", "redirectWithRedirectView");
        return new RedirectView("http://localhost:3000/");
    }

	
	@GetMapping("/login")
	public String login() {
		return "confirmacao de login";
	}
	
	@GetMapping("/teste")
	public String testa() {
		return "endpoint nao protegido";
	}
	
	@GetMapping("/teste2")
	public String testa2() {
		return "endpoint protegido";
	}
	
}
