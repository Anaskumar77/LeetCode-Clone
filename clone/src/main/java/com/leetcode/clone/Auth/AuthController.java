package com.leetcode.clone.Auth;


import com.leetcode.clone.Auth.dto.CreateUserDto;
import com.leetcode.clone.Auth.dto.ResponseUserDto;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/auth")
class AuthController {
        @GetMapping("/great")
        public String Great(){
            return "Hello from Great";
        }


        @PostMapping("/register")
        public String Register(@RequestBody CreateUserDto createUserDto) {
            return "Hello";
        }
        
   
    
    

}