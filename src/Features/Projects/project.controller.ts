import { ApiError } from '../../Utils/ApiError';
import { asyncCatch } from '../../Utils/asyncCatch';
import {
  addProjectRequiredServiceService,
  buildProjectMatchesService,
  createProjectService,
  getClientProjectService,
} from './project.service';
import { ProjectCreation, ProjectMatchesRebuildParams } from './project.types';

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

export const authorizeClientProject = (
  fieldName: string,
  requestProperty: 'params' | 'query' | 'headers' | 'body'
) => {
  return asyncCatch(async (req, res, next) => {
    const project = await getClientProjectService(
      req.user?.id!,
      Number(
        req[requestProperty][fieldName] ||
          Number(req[requestProperty][fieldName])
      )
    );
    if (!project) {
      throw new ApiError(
        'you are not allowed to access this project',
        403,
        'fail'
      );
    }

    next();
  });
};

export const createProject = asyncCatch<{}, {}, ProjectCreation>(
  async (req, res) => {
    console.log(req.user?.id);
    req.body.clientId = req.user?.id!;
    const data = await createProjectService(req.body);
    res.status(201).json({
      status: 'success',
      message: 'project created successfully',
      data: data.generatedMaps,
    });
  }
);

export const addProjectService = asyncCatch<{
  projectId: string;
  serviceId: string;
}>(async (req, res) => {
  const data = await addProjectRequiredServiceService(
    Number(req.params.projectId),
    Number(req.params.serviceId)
  );
  res.status(201).json({
    status: 'success',
    message: 'a project required service is add successfully',
    data: data.generatedMaps,
  });
});
