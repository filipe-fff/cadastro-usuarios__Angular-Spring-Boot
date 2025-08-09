package com.user.registretion.UserRegistration.repositories;

import com.user.registretion.UserRegistration.models.Dependent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DependentRepository extends JpaRepository<Dependent, UUID> {

//    Query JPQL
//    -------------------------------------------------
    @Query("""
            SELECT CASE WHEN( COUNT(d) > 0 ) THEN TRUE ELSE FALSE END
            FROM Dependent d
            WHERE d.id <> :id AND d.document = :document
            """)
    boolean existsDependentByIdNotAndDocument(@Param("id") UUID id, @Param("document") Long document);

//    Query Method
//    -------------------------------------------------
    boolean existsByIdNotAndDocument(UUID id, Long document);
}