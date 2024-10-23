import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const Taxes = ({ activeTab }) => {
  const [isSaleOpen, setIsSaleOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState("");
  const [appliedOn, setAppliedOn] = useState("Sale Price");
  const [taxesApplied, setTaxesApplied] = useState([]);

  const handleAddTax = (type) => {
    if (selectedTax) {
      const newTax = {
        type,
        tax: selectedTax,
        appliedOn,
      };
      setTaxesApplied([...taxesApplied, newTax]);
      setSelectedTax("");
      setIsSaleOpen(false);
      setIsPurchaseOpen(false);
    }
  };

  const handleRemoveTax = (index) => {
    const updatedTaxes = taxesApplied.filter((_, i) => i !== index);
    setTaxesApplied(updatedTaxes);
  };

  const cancelAction = () => {
    setSelectedTax("");
    setIsSaleOpen(false);
    setIsPurchaseOpen(false);
  };

    return (
      <div>
        {activeTab === "Taxes" && (
          <div className="container mx-auto p-4">
            <div className="grid lg:grid-cols-12 md:grid-cols-6  gap-4">
              {/* Taxes on Sale Section */}
              <div className="col-span-6">
                <div className="flex justify-between items-center mb-4 shadow-xl bg-white rounded-lg ">
                  <h1 className="text-xl font-bold">Taxes On Sale</h1>
                  <button
                    onClick={() => setIsSaleOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add
                  </button>
                </div>
                {isSaleOpen && (
                  <div className="border p-4 bg-white shadow-md relative">
                    <h2 className="text-lg mb-2">Sale Taxes</h2>
                    <button
                      className="absolute top-2 right-2 text-gray-500"
                      onClick={cancelAction}
                    >
                      <FaTimes />
                    </button>
                    <div className="mb-2">
                      <label htmlFor="tax" className="block mb-1">
                        Tax:
                      </label>
                      <select
                        id="tax"
                        value={selectedTax}
                        onChange={(e) => setSelectedTax(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">-Choose-</option>
                        <option value="Tax 1">Tax 1</option>
                        <option value="Tax 2">Tax 2</option>
                        <option value="Tax 3">Tax 3</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="appliedOn" className="block mb-1">
                        Applied On:
                      </label>
                      <select
                        id="appliedOn"
                        value={appliedOn}
                        onChange={(e) => setAppliedOn(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="Sale Price">Sale Price</option>
                        <option value="Cost Price">Cost Price</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleAddTax("Sale")}
                      className={`w-full p-2 mt-2 rounded ${
                        selectedTax ? "bg-green-600 text-white" : "bg-gray-400"
                      }`}
                      disabled={!selectedTax}
                    >
                      + ADD
                    </button>
                  </div>
                )}
              </div>

              {/* Taxes on Purchase Section */}
              <div className="col-span-6 ">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-bold">Taxes On Purchase</h1>
                  <button
                    onClick={() => setIsPurchaseOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add
                  </button>
                </div>
                {isPurchaseOpen && (
                  <div className="border p-4 bg-white shadow-md relative">
                    <h2 className="text-lg mb-2">Purchase Taxes</h2>
                    <button
                      className="absolute top-2 right-2 text-gray-500"
                      onClick={cancelAction}
                    >
                      <FaTimes />
                    </button>
                    <div className="mb-2">
                      <label htmlFor="tax" className="block mb-1">
                        Tax:
                      </label>
                      <select
                        id="tax"
                        value={selectedTax}
                        onChange={(e) => setSelectedTax(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">-Choose-</option>
                        <option value="Tax 1">Tax 1</option>
                        <option value="Tax 2">Tax 2</option>
                        <option value="Tax 3">Tax 3</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="appliedOn" className="block mb-1">
                        Applied On:
                      </label>
                      <select
                        id="appliedOn"
                        value={appliedOn}
                        onChange={(e) => setAppliedOn(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        <option value="Purchase Price">Purchase Price</option>
                        <option value="Cost Price">Cost Price</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleAddTax("Purchase")}
                      className={`w-full p-2 mt-2 rounded ${
                        selectedTax ? "bg-green-600 text-white" : "bg-gray-400"
                      }`}
                      disabled={!selectedTax}
                    >
                      + ADD
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Displaying Applied Taxes */}
            <div className="mt-4">
              {taxesApplied.map((tax, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                >
                  <p>
                    {tax.tax} applied on {tax.appliedOn}
                  </p>
                  <button
                    onClick={() => handleRemoveTax(index)}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
};

export default Taxes;
