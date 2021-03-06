import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components/actions';
import { Cross } from 'components/icons';
import styled from 'styled-components';

const Search: React.FC<{ text?: string; newSearch: any }> = ({
  text,
  newSearch,
}) => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q || '');

  const handleChange = (value) => {
    setQ(value);
  };

  function handleClear() {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input.value = '';
    input.focus();
    setQ('');
    newSearch('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    newSearch({
      query: 'q',
      value: q,
    });
  };
  return (
    <SearchWrapper onSubmit={handleSubmit} className="search">
      <Wrapper>
        <SearchInput
          type="search"
          name="q"
          value={q}
          id="searchInput"
          onChange={(e) => handleChange(e.target.value)}
          placeholder={text ? text : 'Try COVID, Hospital, Construction'}
          aria-label="Search"
        />
        <SearchClear
          type="button"
          title="Clear search field"
          onClick={handleClear}
          className="search__clear"
        >
          <span className="sr-only">Clear search field</span>
          <Cross width={24} height={24} fill="#076775" />
        </SearchClear>
      </Wrapper>
      <Button onClick={handleSubmit} className="search__submit">
        Submit <span className="sr-only">search</span>
      </Button>
    </SearchWrapper>
  );
};

export default Search;

export const SearchWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  position: relative;
  flex-grow: 1;

  .search__submit {
    padding: 9px 60px;
    transform: translateX(-5px);
    line-height: 134%;

    @media (max-width: 720px) {
      padding: 9px 24px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchInput = styled.input`
  border: 2px solid #076775;
  border-radius: 4px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
  padding-left: 2.5rem;
  background-color: #fff;
  transition: background-color 150ms ease;
  width: 100%;
  height: 100%;
  line-height: 130%;

  background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z' stroke='%23075E54'/%3E%3C/svg%3E%0A");
  background-position: left 1rem top 50%, 0 0;
  background-repeat: no-repeat, repeat;

  &:not([value='']) {
    + .search__clear {
      display: block;
    }
  }
`;

export const SearchClear = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  button {
    cursor: pointer;
  }
`;
