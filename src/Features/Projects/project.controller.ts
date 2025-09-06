import { asyncCatch } from '../../Utils/asyncCatch';
import { buildProjectMatchesService } from './project.service';
import { ProjectMatchesRebuildParams } from './project.types';

export const buildProjectMatches = asyncCatch<ProjectMatchesRebuildParams>(
  (req, res) => {
    if (!Number(req.params.projectId)) {
      res.status(400).json({
        status: 'error',
        message: 'invalid project id',
      });
    }

    buildProjectMatchesService(Number(req.params.projectId));
  }
);
