
import { Card } from './ui/card';
import type { Answer } from './QuizContainer';
import { motion } from 'framer-motion';

type ResultsProps = {
  answers: Answer[];
};

const Results = ({ answers }: ResultsProps) => {
  const calculateDimensionScore = (startId: number): number => {
    const dimensionAnswers = answers.filter(
      a => a.questionId >= startId && a.questionId < startId + 4
    );
    
    const sum = dimensionAnswers.reduce((acc, curr) => acc + curr.value, 0);
    return Number((sum / 4).toFixed(2));
  };

  const dimensionScores = {
    'Joyous Exploration': calculateDimensionScore(1),
    'Deprivation Sensitivity': calculateDimensionScore(5),
    'Stress Tolerance': calculateDimensionScore(9),
    'Openness to People\'s Ideas': calculateDimensionScore(13),
  };

  const overallScore = Number(
    (Object.values(dimensionScores).reduce((a, b) => a + b, 0) / 4).toFixed(2)
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-arvo text-gray-900">Your Curiosity Profile</h2>
        <p className="font-roboto text-gray-600">
          Here are your scores across the four dimensions of workplace curiosity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(dimensionScores).map(([dimension, score]) => (
          <Card key={dimension} className="p-6">
            <h3 className="font-arvo text-lg text-gray-900">{dimension}</h3>
            <div className="mt-4">
              <div className="text-3xl font-arvo text-primary">{score}</div>
              <motion.div 
                className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / 5) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </motion.div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-8">
        <h3 className="text-2xl font-arvo text-center text-gray-900">
          Overall Curiosity Score
        </h3>
        <div className="text-4xl font-arvo text-primary text-center mt-4">
          {overallScore}
        </div>
        <motion.div 
          className="h-3 bg-gray-100 rounded-full mt-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(overallScore / 5) * 100}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      </Card>
    </div>
  );
};

export default Results;
