package com.zolo.BookLibrary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.sql.Date;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer book_id;
    private Date borrow_start_time;
    private Date borrow_end_time;
    private String bookName;
    private String bookAuthor;
    private boolean borrowed;

    public boolean getBorrowed() {
        return borrowed;
    }

    public void setBorrowed(boolean borrowed) {
        this.borrowed = borrowed;
    }

    public Integer getBook_id() {
        return book_id;
    }

    public void setBook_id(Integer book_id) {
        this.book_id = book_id;
    }

    public Date getBorrow_start_time() {
        return borrow_start_time;
    }

    public void setBorrow_start_time(Date borrow_start_time) {
        this.borrow_start_time = borrow_start_time;
    }

    public Date getBorrow_end_time() {
        return borrow_end_time;
    }

    public void setBorrow_end_time(Date borrow_end_time) {
        this.borrow_end_time = borrow_end_time;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }
}
