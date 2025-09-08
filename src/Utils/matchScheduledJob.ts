import nodeCron from 'node-cron';
import {
  buildProjectMatchesService,
  getActiveProjectsSerivce,
} from '../Features/Projects/project.service';
import { Project } from '../Features/Projects/project.entity';
import { emailNotifier } from './emailNotifier';

nodeCron.schedule('0 0 * * *', async () => {
  let activeProjects: Project[] = [];
  const LIMIT = 100;
  let offset = 0;
  do {
    activeProjects = await getActiveProjectsSerivce(
      { offset, limit: LIMIT },
      {
        client: true,
      },
      {
        id: true,
        client_id: true,
        created_at: true,
      }
    );
    offset += activeProjects.length;
    const buildProjectsMatchesPromises = activeProjects.map((project) => {
      return buildProjectMatchesService(project.id);
    });

    const result = await Promise.all(buildProjectsMatchesPromises);
    console.log(result);
    result.forEach((element, idx) => {
      if (element) {
        emailNotifier.send(
          activeProjects[idx].client.contact_email,
          `Hello, this is exanders360
            exciting news, we've found a new vendor match for your project ${activeProjects[idx].id}.have a great day.
            Muhammad Medhat
          `
        );
      }
    });
  } while (activeProjects.length > 0);
});
