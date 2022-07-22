import { LawJustice, WomenChild, Police, HomeAffairs } from 'components/icons';

export function categoryIcon(tags) {
  if (tags.includes('law')) return <LawJustice />;
  else if (tags.includes('wcd')) return <WomenChild />;
  else if (tags.includes('police')) return <Police />;
  else return <HomeAffairs />;
}

export function categoryTag(tags) {
  if (tags.includes('law')) return 'Ministry of Law & Justice';
  else if (tags.includes('wcd'))
    return 'Ministry of Women & Child Development';
  else if (tags.includes('police')) return 'Department of Police';
  else return 'Ministry of Home Affairs';
}

export function stripTitle(name) {
  const shortName = name.includes('data for the')
    ? name.split('data for the ')[1]
    : name.split('data for ')[1];

  return shortName;
}

export function explorerPopulation(obj) {
  let newObj = {};
  const resources = {};
  const resUrls = [];
  obj.resources &&
    obj.resources.forEach((res) => {
      resUrls.push(res.url);
      if (res.name == 'Datasheet') resources.dataUrl = res.url;
      if (res.name == 'Metadata') resources.metaUrl = res.url;
    });

  newObj = {
    id: obj.name,
    title: obj.title,
    notes: obj.notes || '',
    tags: obj.tags.map((item) => item.display_name),
    dataUrl: resources.dataUrl || '',
    metaUrl: resources.metaUrl || '',
    resUrls,
  };

  return newObj;
}

export function datasetPopulation(obj) {
  const populated = [];

  obj.forEach((item) => {
    const resources = {};
    item.resources &&
      item.resources.forEach((res) => {
        if (res.name == 'Datasheet') resources.dataUrl = res.url;
        if (res.name == 'Metadata') resources.metaUrl = res.url;
      });

    populated.push({
      id: item.name,
      title: item.title,
      tags: item.tags.map((item) => item.display_name),
      dataUrl: resources.dataUrl || '',
      metaUrl: resources.metaUrl || '',
    });
  });

  return populated;
}

export function filter_data_indicator(mainData, indicatorName) {
  let data = mainData;
  if (indicatorName) {
    if (data.length > 0) {
      data = data.filter((item) => item['indicators'] == indicatorName);
    }
  }
  return data;
}

export function filter_data_budgettype(mainData, budgetType) {
  let data = mainData;
  if (budgetType) {
    if (data.length > 0) {
      data = data.filter((item) => item['budgetType'] == budgetType);
    }
  }

  return data;
}

// fetch based on tags
export async function fetchFromTags(tags, id) {
  const tagsString = tags.map((i) => `"${i}"`).join(' OR ');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=tags:(${tagsString})`
  ).then((res) => res.json());
  const data = response.result.results;
  let filteredData = data.filter((item) => item.name != id).splice(0, 2);
  filteredData = filteredData.map((item) => explorerPopulation(item));

  return filteredData;
}

// filter obj to String
export function filterObjToString(filterObj) {
  const final = [];
  let filter;
  Object.keys(filterObj).forEach((val) => {
    if (filterObj[val].length > 0) {
      filterObj[val].forEach((item) => final.push(`${val}:"${item}"`));

      filter = final.join(' AND ');
    }
  });
  return filter;
}

// Filter string to Filter Object
export function filterStringToObject(fq, data) {
  const obj = {};
  Object.keys(data).forEach((val) => {
    obj[val] = [];
  });
  if (fq) {
    const removeEscape = fq.replaceAll(/"/g, '');
    const splitFilters = removeEscape.split(' AND ');

    splitFilters.forEach((query) => {
      const id = query.split(':')[0];
      const value = query.split(':')[1];
      obj[id].push(value);
      if (document.getElementById(value))
        document.getElementById(value).setAttribute('aria-pressed', 'true');
    });
  }

  return obj;
}

// fetch medium post banner URL
export function getMediumBanner(postContent) {
  const srcIndex = postContent.indexOf('src=');
  const srcStart = srcIndex + 5;
  const srcEnd = postContent.substring(srcStart).indexOf('"') + srcStart;
  const src = postContent.substring(srcStart, srcEnd);
  return src;
}

// return post time in required format
export function getDate(time) {
  // ordinal suffix for date
  const getOrdinal = function (d) {
    let type;
    if (d > 3 && d < 21) type = 'th';
    switch (d % 10) {
      case 1:
        type = 'st';
        break;
      case 2:
        type = 'nd';
        break;
      case 3:
        type = 'rd';
        break;
      default:
        type = 'th';
        break;
    }
    return `${d}${type}`;
  };

  const dt = new Date(time);
  if (dt instanceof Date && !isNaN(dt.valueOf())) {
    const date = getOrdinal(dt.getDate());
    const month = dt.toLocaleString('default', { month: 'short' });
    return `${date} ${month}, ${dt.getFullYear()}`;
  } else return time;
}

// fetch particular dataset
export async function fetchAPI(path) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_show?id=${path}`
  );
  const data = await response.json();
  return data;
}

export async function getFilters(list, variable, page) {
  try {
    // if filters and searc found in url, also use those
    const queryVars = `fq=${
      variable.fq ? `${variable.fq} AND type:${page}` : `type:${page}`
    }&q=${variable.q ? variable.q : ''}`;

    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?facet.field=[${list}]&facet.limit=6&${queryVars}`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

export function handleSearch(query, obj) {
  const newObj = {};
  Object.keys(obj).forEach((objVal) => {
    newObj[objVal] = obj[objVal].filter((item) =>
      JSON.stringify(item, ['title', 'tags'])
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  });

  return newObj;
}
