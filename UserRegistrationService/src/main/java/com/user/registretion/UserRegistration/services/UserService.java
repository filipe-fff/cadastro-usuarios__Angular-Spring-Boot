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
        user.setPassword(userSaveDTO.password());
        user.setEmail(userSaveDTO.email());
        user.setCountry(userSaveDTO.country());
        user.setState(userSaveDTO.state());
        user.setMaritalStatus(userSaveDTO.maritalStatus());
        user.setMonthlyIncome(userSaveDTO.monthlyIncome());
        user.setBirthDate(userSaveDTO.birthDate());

        user.setPhoneList(this.convertPhoneDTOListToPhoneList(user, userSaveDTO.phoneList()));
        user.setAddressList(this.convertAddressDTOListToAddressList(user, userSaveDTO.addressList()));
        user.setDependents(this.convertDependentsDTOToDependents(user, userSaveDTO.dependents()));
        user.setMusics(this.convertMusicsDTOToMusics(user, userSaveDTO.musics()));

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
    public boolean existsByIdNotAndName(UUID id, String name) {
        return userRepository.existsByIdNotAndName(id, name);
    }

    @Transactional
    public boolean existsByIdNotAndEmail(UUID id, String email) {
        return userRepository.existsByIdNotAndEmail(id, email);
    }

    @Transactional
    public boolean existsByIdNotAndPassword(UUID id, String password) {
        return userRepository.existsByIdNotAndPassword(id, password);
    }

    // UPDATE
    @Transactional
    public User update(UUID id, UserUpdateDTO userUpdateDTO) {
        User user = new User();

        user.setId(id);
        user.setName(userUpdateDTO.name());
        user.setPassword(userUpdateDTO.password());
        user.setPhotoUrl("");
        user.setEmail(userUpdateDTO.email());
        user.setCountry(userUpdateDTO.country());
        user.setState(userUpdateDTO.state());
        user.setMaritalStatus(userUpdateDTO.maritalStatus());
        user.setMonthlyIncome(userUpdateDTO.monthlyIncome());
        user.setBirthDate(userUpdateDTO.birthDate());
        user.setPhoneList(this.convertPhoneDTOListToPhoneList(user, userUpdateDTO.phoneList()));
        user.setAddressList(this.convertAddressDTOListToAddressList(user, userUpdateDTO.addressList()));
        user.setDependents(this.convertDependentsDTOToDependents(user, userUpdateDTO.dependents()));
        user.setMusics(this.convertMusicsDTOToMusics(user, userUpdateDTO.musics()));

        return userRepository.save(user);
    }

    // DELETE
    @Transactional
    public void delete(UUID id) {
        this.userRepository.deleteById(id);
    }

    private List<Phone> convertPhoneDTOListToPhoneList(User user, List<PhoneDTO> phoneDTOList) {
        return phoneDTOList.stream().map(p -> new Phone(user, p)).toList();
    }

    private List<Address> convertAddressDTOListToAddressList(User user, List<AddressDTO> addressDTOList) {
        return addressDTOList.stream().map(a -> new Address(user, a)).toList();
    }

    private List<Dependent> convertDependentsDTOToDependents(User user, List<DependentDTO> dependentsDTO) {
        return dependentsDTO.stream().map(d -> new Dependent(user, d)).toList();
    }

    private List<Music> convertMusicsDTOToMusics(User user, List<MusicDTO> musicsDTO) {
        return musicsDTO.stream().map(m -> new Music(user, m)).toList();
    }
}