import Table from 'react-bootstrap/Table';

export const ProgramTable: React.FC = () => {
  return (
    <div className="container">
      <h5>项目列表：</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>预算(RMB)</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BCEE</td>
            <td>100万</td>
            <td>18个月</td>
          </tr>
          <tr>
            <td>ATP</td>
            <td>60万</td>
            <td>12个月</td>
          </tr>
          <tr>
            <td>BCPNP</td>
            <td>120万</td>
            <td>24个月</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
