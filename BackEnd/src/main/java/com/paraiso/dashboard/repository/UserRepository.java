package com.paraiso.dashboard.repository;

import com.paraiso.dashboard.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel,Long> {

  boolean existsByEmail(String email);

  Optional<UserModel> findByEmail(String email);
}
