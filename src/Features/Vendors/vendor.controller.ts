import { asyncCatch } from '../../Utils/asyncCatch';
import { getTopThreeVendorsPerCountryService } from './vendor.service';

export const getTopThreeVendorsPerCountry = asyncCatch(async (req, res) => {
  const data = await getTopThreeVendorsPerCountryService();

  res.status(200).json({
    status: 'success',
    message: 'data retreived successfully',
    data,
  });
});
