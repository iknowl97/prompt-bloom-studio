import { Award, Flame, BookOpen, Zap, BookMarked } from 'lucide-react';
import { UserProgress, Badge, LearningModule } from '../../../types';

interface ProgressDashboardProps {
  userProgress: UserProgress;
  modules: LearningModule[];
}

const ProgressDashboard = ({ userProgress, modules }: ProgressDashboardProps) => {
  const completedModulesCount = userProgress.completedModules.length;
  const totalModules = modules.length;
  const completionPercentage = Math.round((completedModulesCount / totalModules) * 100);
  
  const completedExercisesCount = userProgress.completedExercises.length;
  const totalExercises = modules.reduce((sum, module) => sum + module.exercises.length, 0);
  
  const stats = [
    {
      name: 'Completed Modules',
      value: `${completedModulesCount}/${totalModules}`,
      icon: <BookMarked className="h-5 w-5 text-primary-500" />,
      color: 'bg-primary-100',
    },
    {
      name: 'Exercises Completed',
      value: `${completedExercisesCount}/${totalExercises}`,
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      color: 'bg-amber-100',
    },
    {
      name: 'Current Streak',
      value: `${userProgress.currentStreak} days`,
      icon: <Flame className="h-5 w-5 text-error-500" />,
      color: 'bg-error-100',
    },
    {
      name: 'Badges Earned',
      value: userProgress.badges.length,
      icon: <Award className="h-5 w-5 text-accent-500" />,
      color: 'bg-accent-100',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Learning Progress</h2>
          <p className="text-text-secondary">Track your journey through prompt engineering</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B8BDB"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-semibold">{completionPercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center p-4 rounded-lg border">
            <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
            <div className="ml-4">
              <div className="text-text-secondary text-sm">{stat.name}</div>
              <div className="font-semibold text-lg">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {userProgress.badges.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-4">Recent Badges</h3>
          <div className="flex flex-wrap gap-4">
            {userProgress.badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-500" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium">{badge.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-end">
        <button className="text-primary-500 flex items-center text-sm hover:text-primary-600 transition-colors">
          <BookOpen className="h-4 w-4 mr-1" />
          View all learning materials
        </button>
      </div>
    </div>
  );
};

export default ProgressDashboard;