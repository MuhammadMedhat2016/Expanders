import { asyncCatch } from '../../Utils/asyncCatch';
import { getCountryProjectsIdsService } from '../Countries/country.service';
import { countProjectsDocumentsService } from '../Documents/document.service';
import { getTopThreeVendorsPerCountryService } from '../Vendors/vendor.service';

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
