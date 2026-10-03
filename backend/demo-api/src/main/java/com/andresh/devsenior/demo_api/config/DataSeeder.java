package com.andresh.devsenior.demo_api.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.andresh.devsenior.demo_api.model.Usuario;
import com.andresh.devsenior.demo_api.repository.UsuarioRepository;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedUsuarios(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (usuarioRepository.findByUsername("ana").isEmpty()) {
                Usuario ana = new Usuario();
                ana.setUsername("ana");
                ana.setPassword(passwordEncoder.encode("1234"));
                usuarioRepository.save(ana);
                System.out.println("Usuario de prueba creado: ana / 1234");
            }
        };
    }
}