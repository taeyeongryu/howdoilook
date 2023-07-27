package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface OotdRepository
        extends JpaRepository<Ootd, Long>,
        OotdCustomRepository, QuerydslPredicateExecutor<Ootd> {
}
