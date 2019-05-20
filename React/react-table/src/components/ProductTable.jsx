import React from "react";
import ProductRow from "./ProductRow";

class ProductTable extends React.Component {
  render() {
    if (this.props.products) {
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.name.indexOf(filterText) === -1) {
          return "";
        }
        return (
          <ProductRow
            onProductTableUpdate={onProductTableUpdate}
            product={product}
            onDelEvent={rowDel.bind(this)}
            key={product.id}
          />
        );
      });
    }

    return (
      <div style={{ marginTop: "10px" }}>
        <div>
          <div>
            <button
              type="button"
              onClick={this.props.onRowAdd}
              className="btn btn-success pull-right"
            >
              Add
            </button>

            <button
              type="button"
              onClick={this.props.onRowSave}
              className="btn btn-success pull-right"
              style={{ marginLeft: "10px" }}
            >
              Save
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
              <th />
            </tr>
          </thead>

          <tbody>{product}</tbody>
        </table>
      </div>
    );
  }
}
export default ProductTable;
