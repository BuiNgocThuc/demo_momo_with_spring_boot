package com.example.demomomo;

import com.example.demomomo.configuration.MomoSettings;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(MomoSettings.class)
public class DemoMomoApplication {

        public static void main(String[] args) {
                SpringApplication.run(DemoMomoApplication.class, args);
        }

}
