
import { useState } from 'react';
import QuestionGroup from './QuestionGroup';
import Results from './Results';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

export type Dimension = 'Joyous Exploration' | 'Deprivation Sensitivity' | 'Stress Tolerance' | 'Openness to People\'s Ideas';

export type Answer = {
  questionId: number;
  value: number;
};

const QUESTION_GROUPS = [
  {
    dimension: 'Joyous Exploration' as Dimension,
    questions: [
      { id: 1, text: 'I enjoy that I often find my mind continues to work through complex problems outside of work.' },
      { id: 2, text: 'I get excited thinking about experimenting with different ideas.' },
      { id: 3, text: 'At work, I seek out opportunities to expand my knowledge or skills.' },
      { id: 4, text: 'I seek out work tasks where I will have to think in depth about something.' },
    ],
  },
  {
    dimension: 'Deprivation Sensitivity' as Dimension,
    questions: [
      { id: 5, text: 'When given a complex problem at work, I can\'t rest until I find the answer.' },
      { id: 6, text: 'When a complex work problem arises, I continue to seek information until I understand it fully.' },
      { id: 7, text: 'I can spend hours on a single problem because I feel a need to find an answer.' },
      { id: 8, text: 'I work relentlessly to find answers to complicated questions at work.' },
    ],
  },
  {
    dimension: 'Stress Tolerance' as Dimension,
    questions: [
      { id: 9, text: 'When work is anxiety-provoking, I tend to explore rather than avoid.' },
      { id: 10, text: 'The possibility of being distressed does not impact my motivation to work on new projects.' },
      { id: 11, text: 'I do not shy away from the unknown or unfamiliar even if it seems scary.' },
      { id: 12, text: 'When probing deeper into a project that interests me, feeling anxious does not derail me.' },
    ],
  },
  {
    dimension: 'Openness to People\'s Ideas' as Dimension,
    questions: [
      { id: 13, text: 'It is important to listen to ideas from people who think differently.' },
      { id: 14, text: 'I value colleagues with different ideas.' },
      { id: 15, text: 'I like to hear ideas from colleagues even if they are different from my current line of thinking.' },
      { id: 16, text: 'Even when I am confident in my approach to a problem, I like to hear other people\'s opinions.' },
    ],
  },
];

const QuizContainer = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing !== -1) {
        const newAnswers = [...prev];
        newAnswers[existing] = { questionId, value };
        return newAnswers;
      }
      return [...prev, { questionId, value }];
    });
  };

  const canProceed = () => {
    const currentQuestions = QUESTION_GROUPS[currentGroupIndex].questions;
    return currentQuestions.every(q => answers.some(a => a.questionId === q.id));
  };

  const handleNext = () => {
    if (currentGroupIndex < QUESTION_GROUPS.length - 1) {
      setCurrentGroupIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentGroupIndex + 1) / QUESTION_GROUPS.length) * 100;

  if (showResults) {
    return <Results answers={answers} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Workplace Curiosity Quiz</h1>
        <p className="text-gray-600">Rate each statement based on how much it describes you in your job or workplace.</p>
      </div>

      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 text-center">
          Section {currentGroupIndex + 1} of {QUESTION_GROUPS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroupIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionGroup
            group={QUESTION_GROUPS[currentGroupIndex]}
            answers={answers}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-6"
        >
          {currentGroupIndex < QUESTION_GROUPS.length - 1 ? "Next" : "See Results"}
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;
