package com.user.registretion.UserRegistration.repositories;

import com.user.registretion.UserRegistration.models.Phone;
import jakarta.websocket.server.PathParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, UUID> {

//    Query JPQL
//    -------------------------------------------------
    @Query("""
            SELECT CASE WHEN( COUNT(p) > 0 ) THEN TRUE ELSE FALSE END
            FROM Phone p
            WHERE p.user.id <> :id AND
            p.internationalCode = :internationalCode AND
            p.areaCode = :areaCode AND
            p.number = :number
            """)
    boolean existsPhoneByUserIdNotAndPhone(
            @Param("id") UUID id,
            @Param("internationalCode") String internationalCode,
            @Param("areaCode") String areaCode,
            @Param("number") String number
    );

//    Query Method
//    -------------------------------------------------
    boolean existsByUserIdNotAndInternationalCodeAndAreaCodeAndNumber(
            UUID userIde,
            String internationalCode,
            String areaCode,
            String number
    );
}