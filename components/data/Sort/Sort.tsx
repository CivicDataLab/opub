import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'components/actions';

const options = [
  {
    id: 'score:desc',
    name: 'Relevance',
  },
  {
    id: 'title_string:asc',
    name: 'Name Ascending',
  },
  {
    id: 'title_string:desc',
    name: 'Name Descending',
  },
  {
    id: 'metadata_modified:desc',
    name: 'Last Modified',
  },
  {
    id: 'views_recent:desc',
    name: 'Popular',
  },
];

const Sort: React.FC<{ newSort: any; className?: string }> = ({
  newSort,
  className,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState(options[0].id);
  const [value, setValue] = useState(options[0].name);

  useEffect(() => {
    const currentSort = router.query.sort ? router.query.sort : '';

    setSort(currentSort as string);
  }, [router.query.sort]);

  useEffect(() => {
    let currentSort = options.find((o) => o.id === sort);
    currentSort && setValue(currentSort.name);
  }, [sort]);

  const handleChange = (event: any) => {
    setSort(event);

    newSort({
      query: 'sort',
      value: event,
    });
  };
  return (
    <Menu
      options={options}
      heading="Sort by"
      handleChange={handleChange}
      value={value}
      className={className}
    />
  );
};

export default Sort;
