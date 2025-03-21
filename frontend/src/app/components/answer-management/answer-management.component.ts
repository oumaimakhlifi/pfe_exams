import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../models/Answer';

@Component({
  selector: 'app-answer-management',
  templateUrl: './answer-management.component.html',
  styleUrls: ['./answer-management.component.css']
})
export class AnswerManagementComponent implements OnInit {
  answers: Answer[] = [];
  studentIdFilter: number | undefined;
  examIdFilter: number | undefined;
  showModal: boolean = false;
  selectedAnswer: Answer = { id: '', text: '', student: null, question: null, studentId: null, questionId: null, examId: null }; // Aligné avec null
  isEditMode: boolean = false;
  message: string = '';

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    this.loadAllAnswers();
  }

  loadAllAnswers() {
    this.answerService.getAllAnswers().subscribe({
      next: (data) => {
        console.log('Réponses reçues :', data); // Débogage
        this.answers = data;
        if (data.length === 0) {
          this.message = 'Aucune réponse disponible dans la base de données.';
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réponses :', err); // Débogage
        this.message = `Erreur lors du chargement des réponses : ${err.message}`;
      }
    });
  }

  searchAnswers() {
    if (this.studentIdFilter !== undefined && this.examIdFilter !== undefined) {
      this.answerService.getAnswersByStudentAndExam(this.studentIdFilter, this.examIdFilter).subscribe({
        next: (data) => {
          console.log('Réponses filtrées reçues :', data); // Débogage
          this.answers = data;
        },
        error: (err) => this.message = `Erreur : ${err.message}`
      });
    } else {
      this.message = 'Veuillez entrer un ID étudiant et un ID examen pour la recherche.';
      this.loadAllAnswers();
    }
  }

  openAddModal() {
    this.selectedAnswer = { id: '', text: '', student: null, question: null, studentId: null, questionId: null, examId: null };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(answer: Answer) {
    this.selectedAnswer = { ...answer };
    this.isEditMode = true;
    this.showModal = true;
  }

  saveAnswer() {
    if (this.isEditMode) {
      this.answerService.updateAnswer(this.selectedAnswer.id!, this.selectedAnswer).subscribe({
        next: (data) => {
          this.message = 'Réponse modifiée avec succès !';
          this.updateLocalAnswer(data);
          this.showModal = false;
          this.loadAllAnswers();
        },
        error: (err) => {
          console.error('Erreur lors de la modification :', err); // Débogage
          this.message = `Erreur : ${err.message}`;
          this.showModal = false;
        }
      });
    } else {
      this.answerService.createAnswers([this.selectedAnswer]).subscribe({
        next: (data) => {
          this.message = 'Réponse ajoutée avec succès !';
          this.answers.push(data[0]);
          this.showModal = false;
          this.loadAllAnswers();
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout :', err); // Débogage
          this.message = `Erreur : ${err.message}`;
          this.showModal = false;
        }
      });
    }
  }

  deleteAnswer(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette réponse ?')) {
      this.answerService.deleteAnswer(id).subscribe({
        next: () => {
          this.message = 'Réponse supprimée avec succès !';
          this.answers = this.answers.filter(a => a.id !== id);
          this.loadAllAnswers();
        },
        error: (err) => this.message = `Erreur : ${err.message}`
      });
    }
  }

  private updateLocalAnswer(updatedAnswer: Answer) {
    const index = this.answers.findIndex(a => a.id === updatedAnswer.id);
    if (index !== -1) this.answers[index] = updatedAnswer;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }
}
