package com.microservices.answerservice.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.services.AnswerService;

@RequestMapping("answers")
@CrossOrigin(origins = "http://192.168.56.55:4200")
@RestController
public class AnswerController {

    @Autowired
    private AnswerService service;

    @GetMapping // Nouvelle méthode pour récupérer toutes les réponses
    public ResponseEntity<Iterable<Answer>> getAll() {
        Iterable<Answer> answers = service.findAll();
        return ResponseEntity.ok(answers);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Iterable<Answer> answers) {
        answers = ((List<Answer>) answers).stream().map(r -> {
            if (r.getStudent() != null) r.setStudentId(r.getStudent().getId());
            if (r.getQuestion() != null) r.setQuestionId(r.getQuestion().getId());
            return r;
        }).collect(Collectors.toList());
        Iterable<Answer> answersBD = service.saveAll(answers);
        return ResponseEntity.status(HttpStatus.CREATED).body(answersBD);
    }

    @GetMapping("/student/{studentId}/exam/{examId}")
    public ResponseEntity<?> getAnswersByStudentAndByExam(@PathVariable Long studentId, @PathVariable Long examId) {
        Iterable<Answer> answers = service.findAnswerByStudentByExam(studentId, examId);
        return ResponseEntity.ok(answers);
    }

    @GetMapping("/student/{studentId}/exams-replied")
    public ResponseEntity<?> getExamsByStudentId(@PathVariable Long studentId) {
        Iterable<Long> examsIds = service.findExamsIdByWithAnswersByStudent(studentId);
        return ResponseEntity.ok(examsIds);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Answer answer) {
        Answer existingAnswer = service.findById(id);
        if (existingAnswer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer not found");
        }
        answer.setId(id);
        Answer updatedAnswer = service.save(answer);
        return ResponseEntity.ok(updatedAnswer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Answer existingAnswer = service.findById(id);
        if (existingAnswer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer not found");
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
