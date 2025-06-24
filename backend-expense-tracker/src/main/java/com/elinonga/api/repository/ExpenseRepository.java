package com.elinonga.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elinonga.api.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
