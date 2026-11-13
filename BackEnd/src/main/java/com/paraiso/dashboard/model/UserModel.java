
package com.paraiso.dashboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tab_user")
@NoArgsConstructor
@Getter
@Setter
public class UserModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, length = 255)
  private String password;

  public UserModel(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
