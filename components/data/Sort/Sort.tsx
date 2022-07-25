import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'components/actions';

const options = [
  {
    value: 'score:desc',
    title: 'Relevance',
  },
  {
    value: 'title_string:asc',
    title: 'Name Ascending',
  },
  {
    value: 'title_string:desc',
    title: 'Name Descending',
  },
  {
    value: 'metadata_modified:desc',
    title: 'Last Modified',
  },
  {
    value: 'views_recent:desc',
    title: 'Popular',
  },
];

const Sort: React.FC<{ newSort: any; className?: string }> = ({
  newSort,
  className,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState(options[0].value);
  const [value, setValue] = useState(options[0].title);

  useEffect(() => {
    const currentSort = router.query.sort ? router.query.sort : '';

    setSort(currentSort as string);
  }, [router.query.sort]);

  useEffect(() => {
    let currentSort = options.find((o) => o.value === sort);
    currentSort && setValue(currentSort.title);
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
