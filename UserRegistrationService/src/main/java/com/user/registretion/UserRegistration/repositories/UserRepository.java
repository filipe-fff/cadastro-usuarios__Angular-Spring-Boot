package com.user.registretion.UserRegistration.repositories;

import com.user.registretion.UserRegistration.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

//    Query JPQL
//    -----------------------------------------------------
    @Query("""
            SELECT CASE WHEN (COUNT(u) > 0) THEN TRUE ELSE FALSE END
            FROM User u
            WHERE u.id <> :id AND u.name = :name
            """)
    boolean existsUserByIdNotAndName(@Param("id") UUID id, @Param("name") String name);

    @Query("""
            SELECT CASE WHEN (COUNT(u) > 0) THEN TRUE ELSE FALSE END
            FROM User u
            WHERE u.id <> :id AND u.email = :email
            """)
    boolean existsUserByIdNotAndEmail(@Param("id") UUID id, @Param("email") String email);

    @Query("""
            SELECT CASE WHEN (COUNT(u) > 0) THEN TRUE ELSE FALSE END
            FROM User u
            WHERE u.id <> :id AND u.password = :password
            """)
    boolean existsUserByIdNotAndPassword(@Param("id") UUID id, @Param("password") String password);

//    Query Method
//    -------------------------------------------------

    boolean existsByIdNotAndName(UUID id, String name);

    boolean existsByIdNotAndEmail(UUID id, String email);

    boolean existsByIdNotAndPassword(UUID id, String password);
}