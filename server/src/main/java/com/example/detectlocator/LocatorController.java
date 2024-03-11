package com.example.detectlocator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LocatorController {
        @CrossOrigin(origins = "http://localhost:5173/")
        @PostMapping("/locator")
        public ResponseEntity<String> testScript(@RequestBody String payload) {
            System.out.println();
            System.out.println(payload);
            return new ResponseEntity<>("Ok",HttpStatus.OK);
        }
}
