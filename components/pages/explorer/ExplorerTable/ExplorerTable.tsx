import React, { useEffect, useState } from 'react';
import { Table } from 'components/data';
import { resourceGetter } from 'utils/resourceParser';

const ExplorerTable: React.FC<{ resUrl: any }> = ({ resUrl }) => {
  const [fileDataTable, setFileDataTable] = useState(undefined);
  useEffect(() => {
    let fileDataTable;
    if (resUrl) {
      fileDataTable = resourceGetter(resUrl, true).then((res) => {
        setFileDataTable(res);        
      });
    }
  }, []);
  return fileDataTable ? (
    <Table
      headers={fileDataTable[0] ? Object.keys(fileDataTable[0]) : ['header1']}
      rows={fileDataTable.map(Object.values)}
      caption="Table"
      sortable
    />
  ) : (
    <p>Table is loading...</p>
  );
};

export default ExplorerTable;
