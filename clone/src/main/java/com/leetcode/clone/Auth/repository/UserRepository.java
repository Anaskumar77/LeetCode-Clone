package com.leetcode.clone.Auth.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leetcode.clone.Auth.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository <UserModel, UUID> {

    public boolean exiexistsByEmail(String email);
    
}
