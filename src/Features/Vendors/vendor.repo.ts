//  SELECT * from (SELECT p.country_id,
//          m.vendor_id,
//          AVG(m.score) AS avg_score,
//          ROW_NUMBER() OVER (PARTITION BY p.country_id order by avg(m.score)) AS rn
//   FROM expanders.match m
//   JOIN project p ON m.project_id = p.id
//   WHERE DATEDIFF(CURDATE(), m.created_at) <= 30
//   GROUP BY p.country_id, m.vendor_id) as temp
//   where temp.rn <=3;

import { AppDataSource } from '../../dataSource';
import { Match } from '../Matches/match.entity';
import { Vendor } from './vendor.entity';

const vendorRepository = AppDataSource.getRepository(Vendor);
const matchRepository = AppDataSource.getRepository(Match);

export function getTopThreeVendorsPerCountry() {
  const qs = `select *
    from (${(() => {
      const subQuery = matchRepository.createQueryBuilder('m');
      const sqlStr = subQuery
        .select('m.vendor_id as vendor_id')
        .addSelect('p.country_id as country_id')
        .addSelect('AVG(m.score) as avg_score')
        .addSelect(
          'ROW_NUMBER() OVER (PARTITION BY p.country_id order by avg(m.score) DESC) AS rn'
        )
        .innerJoin('project', 'p', 'm.project_id = p.id')
        .where('DATEDIFF(CURDATE(), m.created_at) <= 30')
        .groupBy('p.country_id, m.vendor_id')
        .getSql();
      return sqlStr;
    })()}
  ) as temp where temp.rn <= 3`;
  return AppDataSource.query(qs);
}
