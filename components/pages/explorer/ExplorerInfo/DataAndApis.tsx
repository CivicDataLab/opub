import React from 'react';
import ExplorerViz from '../ExplorerViz';

const DataAndApis: React.FC<{ data: any; fileData: any; resUrl: any }> = ({
  data,
  fileData,
  resUrl,
}) => {
  return (
    <div>
      <ExplorerViz data={data} vizData={fileData} resUrl={resUrl} />
    </div>
  );
};

export default DataAndApis;
