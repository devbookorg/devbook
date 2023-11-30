import IQuestion from '@/types/questions';
import Question from './Question';

interface QuestionsListProps {
  questions: IQuestion[];
}
export default function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <div>
      {questions.map((question, index) => {
        return <Question key={`question_${question.id}_${index}`} question={question} />;
      })}
    </div>
  );
}
