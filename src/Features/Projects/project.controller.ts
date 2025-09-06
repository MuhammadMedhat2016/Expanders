import { asyncCatch } from '../../Utils/asyncCatch';
import { buildProjectMatchesService } from './project.service';
import { ProjectMatchesRebuildParams } from './project.types';

export const buildProjectMatches = asyncCatch<ProjectMatchesRebuildParams>(
  async (req, res) => {
    if (!Number(req.params.projectId)) {
      res.status(400).json({
        status: 'error',
        message: 'invalid project id',
      });
    }

    await buildProjectMatchesService(Number(req.params.projectId));

    res.status(200).json({
      status: 'success',
      message: `project ${req.params.projectId} vendors score matches updated`,
    });
  }
);
