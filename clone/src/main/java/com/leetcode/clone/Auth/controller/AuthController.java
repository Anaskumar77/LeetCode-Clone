package com.leetcode.clone.Auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.Auth.dto.CreateUserDto;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api/auth")
class AuthController {

   @PostMapping("/register")
   public String (@RequestBody CreateUserDto createUserDto) {
    
       
       return 
   }
   
    
    

}