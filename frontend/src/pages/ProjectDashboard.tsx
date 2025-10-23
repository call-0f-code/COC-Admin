import ProjectView from "../components/Project/ProjectView";

export default function ProjectDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10" />

      {/* Full-width content */}
      <div className="relative z-10 w-full">
        <ProjectView />
      </div>
    </div>
  );
}
