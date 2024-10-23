import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const StockLevel = ({ activeTab }) => {
  const [warehouse, setWarehouse] = useState("");
  const [minStock, setMinStock] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [products, setProducts] = useState([]);

  const handleAdd = () => {
    if (warehouse && minStock !== "") {
      const existingProductIndex = products.findIndex(
        (p) => p.warehouse === warehouse
      );

      if (isEditing) {
        // Update the existing product in edit mode
        const updatedProducts = [...products];
        if (
          existingProductIndex !== -1 &&
          existingProductIndex === editingIndex
        ) {
          // If editing and the same warehouse is selected, add the new stock value
          updatedProducts[editingIndex].minStock =
            Number(updatedProducts[editingIndex].minStock) + Number(minStock);
        } else {
          // If a different warehouse is selected, update the product
          updatedProducts[editingIndex] = { warehouse, minStock };
        }
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        // Add new product or update existing one
        if (existingProductIndex !== -1) {
          // If the warehouse already exists, add the new stock value
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex].minStock =
            Number(updatedProducts[existingProductIndex].minStock) +
            Number(minStock);
          setProducts(updatedProducts);
        } else {
          // Add the new product
          setProducts([...products, { warehouse, minStock }]);
        }
      }

      // Clear input fields
      setWarehouse("");
      setMinStock("");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setWarehouse(products[index].warehouse);
    setMinStock(""); // Clear input so the user can type a new value
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setIsEditing(false);
    setEditingIndex(null);
    setWarehouse("");
    setMinStock("");
  };

  const handleMinStockChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setMinStock(e.target.value);
    }
  };

  const handleWarehouseChange = (e) => {
    setWarehouse(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setWarehouse("");
    setMinStock("");
  };

  return (
    <div>
      {activeTab === "Stock Level" && (
        <div className="w-full mx-auto border-2 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Warehouse Section */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex-1 font-bold text-xl border-b-2 border-r-2 px-5 py-3">
                Warehouse
              </div>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border-r border-b p-4 pb-6 flex justify-between items-center"
                >
                  <div className="flex-1">{product.warehouse}</div>
                </div>
              ))}
              <div className="flex-1 border-r-2 relative">
                <select
                  value={warehouse}
                  onChange={handleWarehouseChange}
                  className="w-[95%] border p-2.5 rounded-md mt-5 mx-4 mb-4"
                >
                  <option value="">Select Warehouse</option>
                  <option value="Warehouse A">Warehouse A</option>
                  <option value="Warehouse B">Warehouse B</option>
                  <option value="Warehouse c">Warehouse C</option>{" "}
                  <option value="Warehouse d">Warehouse D</option>
                </select>
              </div>
            </div>

            {/* Minimum Stock Section */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex-1 text-end font-bold text-xl border-b-2 border-r-2 px-4 py-3">
                Minimum Stock Level
              </div>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border-r border-b p-4 pb-6 flex justify-between items-center"
                >
                  <div className="flex-1 text-end">{product.minStock}</div>
                </div>
              ))}
              <div className="flex-1 border-r-2 relative">
                <input
                  type="text"
                  value={minStock}
                  onChange={handleMinStockChange}
                  placeholder="Enter stock level"
                  className="w-full border p-2 rounded-md mx-3 mt-5 w-[94.8%] mb-4"
                />
              </div>
            </div>

            {/* Actions Section */}
            <div className="col-span-12 lg:col-span-2">
              <div>
                <h1 className="font-bold text-end text-xl border-b-2 px-4 py-3">
                  Action
                </h1>
              </div>
              {products.map((_, index) => (
                <div
                  key={index}
                  className="flex justify-end items-center gap-4 pr-5  border-b-2 pb-6 "
                >
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500"
                  >
                    <FaEdit className="lg:text-2xl md:2xl sm:xl mt-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500"
                  >
                    <FaTrash className="lg:text-2xl md:2xl sm:xl mt-4" />
                  </button>
                </div>
              ))}

              {/* Check and Cross Buttons Below the List */}
              <div className="flex justify-end items-center gap-3 mt-6 pb-6">
                <button
                  onClick={handleAdd}
                  className="text-green-500 "
                >
                  <FaCheck className="lg:text-2xl md:2xl sm:xl  " />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-500 "
                >
                  <FaTimes className="lg:text-2xl md:2xl sm:xl mr-6  " />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockLevel;
