import React, { Component } from "react";
// import { Link } from "react-router-dom";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    {
      /* I didn't use _.get because it doesn't work, 
              instead I've used a ternary operator to check if it's an object, 
              if so, it will render the only nested property we have 
              in the fake database  */
    }

    // if(item.title) return <Link to="/movies"> {item[column.path]} </Link>

      return typeof item[column.path] === "object"
        ? item.genre.name
        : item[column.path];
    
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
    );
  }
}

export default TableBody;
