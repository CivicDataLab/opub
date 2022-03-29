export async function fetchOrgs() {
  const response = await fetch(
    `${process.env.CKAN_URL}/organization_list?all_fields=true&limit=15`
  );
  const data = await response.json();
  return data;
}

function changeKeyName(key) {
  if (key == 'size') return 'rows';
  else if (key == 'from') return 'start';
  else return key;
}

export async function fetchOrgDatasets(id, variable) {
  // creating a string of parameter from object of variables for CKAN API use
  const varArray = Object.keys(variable).map((key) => {
    return `${changeKeyName(key)}=${variable[key]}`;
  });
  const params =
    varArray.length > 0 ? varArray.join('&') : `fq=(organization:${id})`;

  const response = await fetch(
    `${process.env.CKAN_URL}/package_search?${params}`
  );
  const data = await response.json();
  return data;
}

export async function fetchOrgFilters(list, variable) {
  try {
    // if filters and search found in url, also use those
    const queryVars = `fq=${variable.fq ? variable.fq : ''}&q=${
      variable.q ? variable.q : ''
    }`;

    const fetchData = await fetch(
      `${process.env.CKAN_URL}/package_search?facet.field=[${list}]&${queryVars}`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchOrgDetails(id) {
  const response = await fetch(
    `${process.env.CKAN_URL}/organization_show?id=${id}`
  );
  const data = await response.json();
  return data;
}
