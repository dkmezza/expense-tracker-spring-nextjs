package com.elinonga.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elinonga.api.model.Expense;
import com.elinonga.api.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> getAll() {
        return repository.findAll();
    }

    public Optional<Expense> getById(Long id) {
        return repository.findById(id);
    }

    public Expense create(Expense expense) {
        return repository.save(expense);
    }

    public Expense update(Long id, Expense updated) {
        return repository.findById(id).map(expense -> {
            expense.setDate(updated.getDate());
            expense.setCategory(updated.getCategory());
            expense.setDescription(updated.getDescription());
            expense.setAmount(updated.getAmount());
            return repository.save(expense);
        }).orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
