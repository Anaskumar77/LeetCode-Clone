package com.leetcode.clone.Auth.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leetcode.clone.Auth.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    public boolean existsByEmail(String email);

}
