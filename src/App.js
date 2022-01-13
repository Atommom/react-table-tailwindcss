import { useMemo, useState, useEffect } from 'react';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Address 1',
        accessor: 'address1',
        sortable: true,
        filterable: true
      },
      {
        Header: 'Address 2',
        accessor: 'address2'
      },
      {
        Header: 'City',
        accessor: 'city',
        sortable: true,
        filterable: true
      },
      {
        Header: 'State',
        accessor: 'state',
        sortable: true,
        filterable: true
      },
      {
        Header: 'Zip',
        accessor: 'zip'
      }
    ],
    []
  );

  useEffect(() => {
    fetch('https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address')
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const onUpdate = (address) => {
    const index = data.findIndex(({ id }) => address.id === id);
    data[index] = address;
    setData([...data]);
  };

  return (
    <Table columns={columns} data={data} onUpdate={onUpdate} />
  );
};

export default App;
