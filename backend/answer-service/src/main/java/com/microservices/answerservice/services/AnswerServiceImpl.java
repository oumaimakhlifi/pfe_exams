package com.microservices.answerservice.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.models.repository.AnswerRepository;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository repository;

    public AnswerServiceImpl(AnswerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Iterable<Answer> saveAll(Iterable<Answer> answers) {
        return repository.saveAll(answers);
    }

    @Override
    public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId) {
        return repository.findAnswerByStudentByExam(studentId, examId);
    }

    @Override
    public Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId) {
        List<Answer> answerList = (List<Answer>) repository.findExamsIdByWithAnswersByStudent(studentId);
        return answerList
                .stream()
                .map(Answer::getExamId) // Utiliser directement examId
                .filter(examId -> examId != null)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public Iterable<Answer> findByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }
}
