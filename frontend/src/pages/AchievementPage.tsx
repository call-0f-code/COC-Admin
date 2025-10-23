import { AchievementsView } from "../components/achievements/AchievementView";



export default function AchievementPage() {

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <AchievementsView/>
      </div>
    </div>
  );
}