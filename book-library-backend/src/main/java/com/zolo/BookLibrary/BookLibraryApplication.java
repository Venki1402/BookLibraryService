package com.zolo.BookLibrary;

import com.zolo.BookLibrary.model.Book;
import com.zolo.BookLibrary.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@SpringBootApplication
@RestController
public class BookLibraryApplication {

	@Autowired private BookRepository bookRepository;

	public static void main(String[] args) {
		SpringApplication.run(BookLibraryApplication.class, args);
		System.out.println("APP LOAD SUCCESS!!");
	}

	@GetMapping("/api/v1/book/")
	Collection<Book> books() {
//		System.out.println("Get Mapping called");
		return (Collection<Book>) bookRepository.findAll();
	}

	@PutMapping("/api/v1/book/")
	public String addBook(@RequestBody Book book){
		book.setBorrowed(false);
		bookRepository.save(book);
		return "Book saved!!";
	}

	@PutMapping("/api/v1/book/borrow")
	public String borrowBooks(@RequestParam(value = "book_id", defaultValue = "52") Integer book_id){
		Optional<Book> book = bookRepository.findById(book_id);

		book.get().setBorrowed(true);

		long millis=System.currentTimeMillis();
		java.sql.Date date=new java.sql.Date(millis);

		book.get().setBorrow_start_time(date);

//		Calendar c = Calendar.getInstance();
//		c.setTime(date);
//		c.add(Calendar.DATE, 30);
//
//		java.sql.Date endDate= new java.sql.Date(c.getTime());

		book.get().setBorrow_end_time(date);

		bookRepository.save(book.get());

		// toggle borrowed state of book (find by bookID)
		return "Book borrowed!!";
	}

	@PostMapping ("/api/v1/book/borrow/return")
	public String returnBooks(@RequestParam(value = "book_id", defaultValue = "52") Integer book_id){
		Optional<Book> book = bookRepository.findById(book_id);

		book.get().setBorrowed(false);
		book.get().setBorrow_start_time(null);
		book.get().setBorrow_end_time(null);
		bookRepository.save(book.get());
		// toggle borrowed state of book (find by bookID)
		return "Book returned!!";
	}

	@PostMapping ("/api/v1/book/delete")
	public String deleteBooks(@RequestParam(value = "book_id", defaultValue = "52") Integer book_id){
		Optional<Book> book = bookRepository.findById(book_id);

		bookRepository.delete(book.get());
		// toggle borrowed state of book (find by bookID)
		return "Book Deleted!!";
	}





}
