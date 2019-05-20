import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
  }

  componentDidMount() {
    axios.get("http://localhost:4000/table").then(response => {
      console.log(response.data);
      this.setState({
        products: response.data
      });
    });
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }

  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
    axios({
      method: "post",
      url: "http://localhost:4000/table/delete",
      data: { id: product.id },
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      console.log(response.data);
    });
  }

  handleAddEvent(evt) {
    var id = Math.random()
      .toFixed(8)
      .substring(2);

    var product = {
      id: id,
      name: "",
      price: 0,
      category: "",
      qty: 0
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleSaveEvent(evt) {
    let NewInsertRecord = this.state.products;

    axios({
      method: "post",
      url: "http://localhost:4000/table/save_evt",
      data: NewInsertRecord,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      console.log(response.data);

      this.setState({
        products: response.data
      });
    });
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });

    //  console.log(this.state.products);
  }
  render() {
    if (this.state.products) {
      return (
        <div className="container" style={{ marginTop: "30px" }}>
          <div>
            <SearchBar
              filterText={this.state.filterText}
              onUserInput={this.handleUserInput.bind(this)}
            />
          </div>
          <div>
            <ProductTable
              onProductTableUpdate={this.handleProductTable.bind(this)}
              onRowAdd={this.handleAddEvent.bind(this)}
              onRowSave={this.handleSaveEvent.bind(this)}
              onRowDel={this.handleRowDel.bind(this)}
              products={this.state.products}
              filterText={this.state.filterText}
            />
          </div>
        </div>
      );
    } else {
      return <div>Loading.....</div>;
    }
  }
}

export default App;
