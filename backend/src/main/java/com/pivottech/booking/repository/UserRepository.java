package com.pivottech.booking.repository;

import com.pivottech.booking.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User getByUsername(String username);

}
