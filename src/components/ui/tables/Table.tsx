import './style.css';

export default function Table() {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th scope="col" className="table-th">
              Product name
            </th>
            <th scope="col" className="table-th">
              Color
            </th>
            <th scope="col" className="table-th">
              Category
            </th>
            <th scope="col" className="table-th">
              Price
            </th>
            <th scope="col" className="table-th">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <th scope="row" className="table-td">
              Apple MacBook Pro 17"
            </th>
            <td className="table-td">Silver</td>
            <td className="table-td">Laptop</td>
            <td className="table-td">$2999</td>
            <td className="table-td">
              <a href="#" className="table-link">
                Edit
              </a>
            </td>
          </tr>
          <tr className="table-row">
            <th scope="row" className="table-td">
              Microsoft Surface Pro
            </th>
            <td className="table-td">White</td>
            <td className="table-td">Laptop PC</td>
            <td className="table-td">$1999</td>
            <td className="table-td">
              <a href="#" className="table-link">
                Edit
              </a>
            </td>
          </tr>
          <tr className="table-last-row">
            <th scope="row" className="table-td">
              Magic Mouse 2
            </th>
            <td className="table-td">Black</td>
            <td className="table-td">Accessories</td>
            <td className="table-td">$99</td>
            <td className="table-td">
              <a href="#" className="table-link">
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
