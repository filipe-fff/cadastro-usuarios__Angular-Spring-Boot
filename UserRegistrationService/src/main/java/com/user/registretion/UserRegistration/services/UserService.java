package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.DTOs.*;
import com.user.registretion.UserRegistration.models.*;
import com.user.registretion.UserRegistration.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    public UserRepository userRepository;

    // CREATE
    @Transactional
    public User save(UserSaveDTO userSaveDTO) {
        User user = new User();

        user.setName(userSaveDTO.name());
        user.setEmail(userSaveDTO.email());
        user.setCountry(userSaveDTO.country());
        user.setState(userSaveDTO.state());
        user.setMaritalStatus(userSaveDTO.maritalStatus());
        user.setMonthlyIncome(userSaveDTO.monthlyIncome());
        user.setBirthDate(userSaveDTO.birthDate());

        user.setPhoneList(this.preparePhoneList(user, userSaveDTO.phoneList()));
        user.setAddressList(this.prepareAddressList(user, userSaveDTO.addressList()));
        user.setDependents(this.prepareDependents(user, userSaveDTO.dependents()));
        user.setMusics(this.prepareMusics(user, userSaveDTO.musics()));

        return userRepository.save(user);
    }

    // READ
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User userById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public boolean existsByName(String name) {
        return userRepository.existsUserByName(name);
    }

    @Transactional
    public boolean existsByEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    // UPDATE
    @Transactional
    public User update(UserUpdateDTO userUpdateDTO) {
        User user = new User();

        user.setId(userUpdateDTO.id());
        user.setName(userUpdateDTO.name());
        user.setPhotoUrl("");
        user.setEmail(userUpdateDTO.email());
        user.setCountry(userUpdateDTO.country());
        user.setState(userUpdateDTO.state());
        user.setMaritalStatus(userUpdateDTO.maritalStatus());
        user.setMonthlyIncome(userUpdateDTO.monthlyIncome());
        user.setBirthDate(userUpdateDTO.birthDate());
        user.setPhoneList(this.preparePhoneList(user, userUpdateDTO.phoneList()));
        user.setAddressList(this.prepareAddressList(user, userUpdateDTO.addressList()));
        user.setDependents(this.prepareDependents(user, userUpdateDTO.dependents()));
        user.setMusics(this.prepareMusics(user, userUpdateDTO.musics()));

        return userRepository.save(user);
    }

    // DELETE
    @Transactional
    public void delete(UUID id) {
        this.userRepository.deleteById(id);
    }

    private List<Phone> preparePhoneList(User user, List<PhoneDTO> phoneListDTO) {
        return phoneListDTO.stream().map(p -> new Phone(user, p)).toList();
    }

    private List<Address> prepareAddressList(User user, List<AddressDTO> addressListDTO) {
        return addressListDTO.stream().map(a -> new Address(user, a)).toList();
    }

    private List<Dependent> prepareDependents(User user, List<DependentDTO> dependentsDTO) {
        return dependentsDTO.stream().map(d -> new Dependent(user, d)).toList();
    }

    private List<Music> prepareMusics(User user, List<MusicDTO> musicsDTO) {
        return musicsDTO.stream().map(m -> new Music(user, m)).toList();
    }
}