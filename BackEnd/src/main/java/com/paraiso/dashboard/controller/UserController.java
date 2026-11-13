package com.paraiso.dashboard.controller;

import com.paraiso.dashboard.dto.LoginRequestDTO;
import com.paraiso.dashboard.dto.UserRequestDTO;
import com.paraiso.dashboard.dto.UserResponseDTO;
import com.paraiso.dashboard.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService){
    this.userService = userService;
  }

  @PostMapping()
  public ResponseEntity<UserResponseDTO>criarUsuario(@RequestBody UserRequestDTO userRequestDTO){
    var cadastro = userService.registrarUser(userRequestDTO);

    return ResponseEntity.ok(cadastro);
  }

  @GetMapping("/{id}")
  public Optional<UserResponseDTO>buscarId(@PathVariable Long id){
    return userService.buscarPorId(id);
  }

  @PostMapping("/login")
  public ResponseEntity<UserResponseDTO>login(@RequestBody LoginRequestDTO dto, HttpSession session){
    UserResponseDTO user = userService.login(dto);

    session.setAttribute("userId", user.id());

    return ResponseEntity.ok(user);
  }

}
