import nodeCron from 'node-cron';
import { getActiveProjectsSerivce } from '../Features/Projects/project.service';
import { Project } from '../Features/Projects/project.entity';


nodeCron.schedule('1 * * * *', async () => {
  let activeProjects: Project[] = [];
  const LIMIT = 1;
  let offset = 0;
  do {
    activeProjects = await getActiveProjectsSerivce();
    offset += activeProjects.length;

    console.log(activeProjects);

    const projectIds = activeProjects.map((project) => project.id);
  } while (activeProjects.length > 0);
});

