import IQuestion from '@/types/questions';
import QuestionItem from './QuestionItem';
import Question from '../common/Question';

interface QuestionsListProps {
  questions: IQuestion[];
  loadQuestions: () => void;
}
export default function QuestionsList({ questions, loadQuestions }: QuestionsListProps) {
  return (
    <div>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <QuestionItem {...question} loadQuestions={loadQuestions} />
          </Question>
        );
      })}
    </div>
  );
}
