package com.korit.mcdonaldkiosk.config;

import com.korit.mcdonaldkiosk.security.filter.JwtAuthenticationFilter;
import com.korit.mcdonaldkiosk.security.handler.CustomAuthenticationEntryPoint;
import com.korit.mcdonaldkiosk.security.oAuth2.CustomOAuth2SuccessHandler;
import com.korit.mcdonaldkiosk.security.oAuth2.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());

        http.sessionManagement(sessionManagement -> {
            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        });
        http.oauth2Login(oauth2 -> {
            oauth2.userInfoEndpoint(userInfoEndpoint -> {
                userInfoEndpoint.userService(customOAuth2UserService);
            });
            oauth2.successHandler(customOAuth2SuccessHandler);
        });

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(exception -> {
            exception.authenticationEntryPoint(customAuthenticationEntryPoint);
        });

        http.authorizeHttpRequests(authorizeRequests -> {
            authorizeRequests.requestMatchers(
                    "/api/auth/**",
                    "/api/admin/**", //테스트용 임시 허용
                    "/api/admin/menuinfo/**",//테스트용 임시 허용
                    "/api/user/**",
                    "/api/admin/menuinfo",
                    "/image/**",
                    "/admin/**",
                    "/swagger-ui/**",
                    "/swagger-resources/**",
                    "/v3/api-docs/**",
                    "/user/**",
                    "/orders/**",
                    "/orders/normal", // 0401
                    "/orders/orderId", // 0401
                    "/orders/detail" // 0401
            ).permitAll();
            authorizeRequests.anyRequest().authenticated();
        });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
