package de.david.cookbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CookBookApplication implements CommandLineRunner {

    @Autowired
    private SampleData sampleData;

    public static void main(String[] args) {
        SpringApplication.run(CookBookApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        sampleData.createSampleData();
    }
}
