package com.example.demomomo.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

        @Bean
        public ObjectMapper objectMapper() {
                ObjectMapper objectMapper = new ObjectMapper();
                // Register the JavaTimeModule to handle Java 8 date and time types
                objectMapper.registerModule(new JavaTimeModule());
                // Disable the default behavior of writing dates as timestamps (milliseconds since epoch)
                objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                return objectMapper;
        }

        @Bean
        public RestTemplate restTemplate() {
                RestTemplate restTemplate = new RestTemplate();

                /// Retrieve the existing list of message converters
                List<HttpMessageConverter<?>> messageConverters = restTemplate.getMessageConverters();

                // Check if MappingJackson2HttpMessageConverter is already present
                boolean hasJacksonConverter = messageConverters.stream()
                          .anyMatch(converter -> converter instanceof MappingJackson2HttpMessageConverter);

                // If not present, add it
                if (!hasJacksonConverter) {
                        messageConverters.add(new MappingJackson2HttpMessageConverter());
                }

                return restTemplate;
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS for all paths and all origins
        registry.addMapping("/**") // Allow CORS for all paths
                .allowedOrigins("*") // Allow all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(false); // Credentials are disallowed when using '*'
        }
}
