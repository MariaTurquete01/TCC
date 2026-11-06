package br.itb.projeto.equita.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ Origens permitidas (frontend)
        // Usa "patterns" para aceitar qualquer porta do Vite (5173, 5174...)
        // e tanto "localhost" quanto "127.0.0.1" ou o IP da rede local.
        // Antes so "http://localhost:5173" era aceito: qualquer outra origem
        // fazia o navegador bloquear a resposta e o front mostrava "Failed to fetch".
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "http://192.168.*.*:*"
        ));

        // ✅ Métodos HTTP permitidos
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        // ✅ Headers permitidos
        config.setAllowedHeaders(List.of("*"));

        // ✅ Headers expostos para o frontend
        config.setExposedHeaders(List.of(
                "Authorization"
        ));

        // ✅ Permite cookies / sessão
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
 