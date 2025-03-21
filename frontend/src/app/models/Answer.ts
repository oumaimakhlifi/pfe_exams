import { Student } from './Student';
import { Question } from './Question';

export class Answer {
    id: string;
    text: string;
    student: Student | null;
    question: Question | null;
    studentId?: number | null;  // Nullable pour correspondre au backend
    questionId?: number | null; // Nullable pour correspondre au backend
    examId?: number | null;     // Nullable pour correspondre au backend
}
