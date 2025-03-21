import { Student } from './Student';
import { Question } from './Question';

export class Answer {
    id: string;
    text: string;
    student: Student | null;    // Peut être null
    question: Question | null;  // Peut être null
    studentId?: number | null;  // Optionnel et peut être null
    questionId?: number | null; // Optionnel et peut être null
    examId?: number | null;     // Optionnel et peut être null
}
