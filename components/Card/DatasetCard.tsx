/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
// import { getDate } from 'utils/index';
import { DatasetCardComp } from 'components/Card/CardComp';
import Tags from 'components/Tags/Tags';

const DatasetCard: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${datapackage.id}`} passHref>
      <DatasetCardComp>
        <section>
          <h3 className="card__heading">{datapackage.title}</h3>
          <Tags data={datapackage.tags} />
          <div className="card__content">
            <p>{truncate(datapackage.notes, { length: 300 })}</p>
          </div>
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;