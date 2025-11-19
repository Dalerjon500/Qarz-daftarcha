import StatusCard from "./StatusCard";
import useTasks from '../../hooks/useTasks';

function Projects() {
  const { taskStatus } = useTasks(); 
  
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
      </div>

      <div className="status-grid">
        {taskStatus.map((statusName: string) => (
          <StatusCard key={statusName} statusName={statusName} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
