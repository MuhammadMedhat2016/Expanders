import { asyncCatch } from '../../Utils/asyncCatch';
import { getCountryProjectsIdsService } from '../Countries/country.service';
import { countProjectsDocumentsService } from '../Documents/document.service';
import {
  addVendorCountryService,
  addVendorServiceService,
  createVendorService,
  getTopThreeVendorsPerCountryService,
} from './vendor.service';

export const getTopThreeVendorsPerCountry = asyncCatch(async (req, res) => {
  let topVendors: any[] = await getTopThreeVendorsPerCountryService();

  const countryIds = new Set(topVendors.map((ele) => ele.country_id));

  const countriesProjects = await Promise.all(
    [...countryIds].map(async (id) => getCountryProjectsIdsService(id))
  );

  let generalCounts = await Promise.all(
    countriesProjects.map((countryProjects) => {
      const projectIds = countryProjects.map((project) => project.id);
      return countProjectsDocumentsService(projectIds);
    })
  );
  const countryProjectsCounts = countriesProjects.map(
    (countryProjects, idx) => {
      return {
        country_id: countryProjects[0].country_id,
        projectsCount: generalCounts[idx][0].projectsCount,
      };
    }
  );

  const data = [...countryIds].map((countryId) => {
    const vendors = topVendors.filter(
      (vendor) => vendor.country_id == countryId
    );
    const count =
      countryProjectsCounts.find(
        (countryProjectcount) => countryProjectcount.country_id == countryId
      )?.projectsCount || 0;

    return {
      country_id: countryId,
      topVendors: vendors,
      count,
    };
  });
  res.status(200).json({
    status: 'success',
    message: 'data retreived successfully',
    data,
  });
});

export const addVendor = asyncCatch(async (req, res) => {
  const data = await createVendorService(req.body);
  res.status(201).json({
    status: 'success',
    message: 'a new vendor has been added successfully',
    data: data.generatedMaps,
  });
});

export const addVendorCountry = asyncCatch<{
  vendorId: string;
  countryId: string;
}>(async (req, res) => {
  const data = await addVendorCountryService(
    Number(req.params.vendorId),
    Number(req.params.countryId)
  );
  res.status(201).json({
    status: 'success',
    message: 'a new country is added to the vendor successfully',
    data: data.generatedMaps,
  });
});

export const addVendorSerivce = asyncCatch<{
  vendorId: string;
  serviceId: string;
}>(async (req, res) => {
  const data = await addVendorServiceService(
    Number(req.params.vendorId),
    Number(req.params.serviceId)
  );

  res.status(201).json({
    status: 'success',
    message:
      'a new services is add to services provided by this vendor successfully',
    data: data.generatedMaps,
  });
});
