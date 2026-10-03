package com.andresh.devsenior.demo_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/api/publico")
    public String publico(){
        return "Cualquiera puede ver esto, sin JWT.";
    }

    @GetMapping("/api/privado")
    public String privado(){
        return "Si ves esto, tu JWT fue validado correctamente por Spring Boot.";
    }

}
