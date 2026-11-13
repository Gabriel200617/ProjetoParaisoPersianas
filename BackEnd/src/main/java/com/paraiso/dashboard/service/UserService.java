
package com.paraiso.dashboard.service;

import com.paraiso.dashboard.dto.LoginRequestDTO;
import com.paraiso.dashboard.dto.UserRequestDTO;
import com.paraiso.dashboard.dto.UserResponseDTO;
import com.paraiso.dashboard.model.UserModel;
import com.paraiso.dashboard.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  private static final int TAMANHO_MINIMO_SENHA = 8;
  private static final int TAMANHO_MAXIMO_NOME = 100;

  public UserService(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public UserResponseDTO registrarUser(UserRequestDTO dto) {

    String name = dto.name() == null
      ? "" : dto.name().trim();

    if (name.isEmpty()) {
      throw new IllegalArgumentException("Informe um nome");
    }

    if (name.contains("@")) {
      throw new IllegalArgumentException("Nome inválido");
    }

    if (name.length() > TAMANHO_MAXIMO_NOME) {
      throw new IllegalArgumentException("Nome muito grande");
    }

    String email = dto.email() == null
      ? "" : dto.email().trim().toLowerCase();

    if (email.isEmpty()) {
      throw new IllegalArgumentException("Informe um email");
    }

    if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
      throw new IllegalArgumentException("Email inválido");
    }

    if (userRepository.existsByEmail(email)) {
      throw new IllegalArgumentException("Esse email já existe");
    }

    if (dto.password() == null ||
      dto.password().length() < TAMANHO_MINIMO_SENHA) {

      throw new IllegalArgumentException(
        "A senha precisa ter no mínimo "
          + TAMANHO_MINIMO_SENHA + " caracteres"
      );
    }

    UserModel userModel = new UserModel(
      name,
      email,
      passwordEncoder.encode(dto.password())
    );

    UserModel salvo = userRepository.save(userModel);

    return new UserResponseDTO(
      salvo.getId(),
      salvo.getName(),
      salvo.getEmail()
    );
  }

  public UserResponseDTO login(LoginRequestDTO dto){
    UserModel user = new UserModel();
      if (dto.password() == null || !passwordEncoder.matches(dto.password(), user.getPassword())){
        throw new IllegalArgumentException("Nome/e-mail ou senha inválidos.");
      }

      return new UserResponseDTO(user.getId(), user.getName(), user.getEmail());
  }

  public Optional<UserResponseDTO> buscarPorId(Long id){
    return userRepository.findById(id)
      .map(user -> new UserResponseDTO(user.getId(),user.getName(),user.getEmail()));
  }
}
