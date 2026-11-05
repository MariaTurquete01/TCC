package br.itb.projeto.equita.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // ================= CSRF / CORS =================
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())

            // ================= AUTORIZAÇÃO =================
            .authorizeHttpRequests(auth -> auth
                // FASE 1 (TCC): API totalmente aberta para testar o CRUD.
                // Na fase de login, copiar a SecurityConfig do pizzaria
                // e trocar "permitAll()" por "authenticated()" nos endpoints
                // que precisarem de proteção.
                .anyRequest().permitAll()
            );

        return http.build();
    }

    // ================= PASSWORD ENCODER =================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
