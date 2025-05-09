
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import type { Dimension, Answer } from './QuizContainer';

type Question = {
  id: number;
  text: string;
};

type QuestionGroupProps = {
  group: {
    dimension: Dimension;
    questions: Question[];
  };
  answers: Answer[];
  onAnswer: (questionId: number, value: number) => void;
};

const RATING_OPTIONS = [
  { value: 1, label: 'Very slightly or not at all like me' },
  { value: 2, label: 'A little like me' },
  { value: 3, label: 'Moderately like me' },
  { value: 4, label: 'Quite a bit like me' },
  { value: 5, label: 'Extremely like me' },
];

const QuestionGroup = ({ group, answers, onAnswer }: QuestionGroupProps) => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-arvo text-gray-900">{group.dimension}</h2>
      
      <div className="space-y-6">
        {group.questions.map((question) => {
          const answer = answers.find(a => a.questionId === question.id);
          
          return (
            <div key={question.id} className="space-y-4">
              <p className="font-roboto text-gray-700">{question.text}</p>
              
              <RadioGroup
                value={answer?.value?.toString()}
                onValueChange={(value) => onAnswer(question.id, parseInt(value))}
                className="grid grid-cols-1 gap-4 sm:grid-cols-5"
              >
                {RATING_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`q${question.id}-${option.value}`}
                    />
                    <Label 
                      htmlFor={`q${question.id}-${option.value}`}
                      className="text-sm font-roboto text-gray-600"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionGroup;
