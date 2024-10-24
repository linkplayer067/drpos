import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const Taxes = ({ activeTab }) => {
  const [isSaleOpen, setIsSaleOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState("");
  const [appliedOn, setAppliedOn] = useState("Sale Price");
  const [taxesApplied, setTaxesApplied] = useState([]);
  const [currentOpenType, setCurrentOpenType] = useState(""); 
          const { register } = useFormContext();

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
      setCurrentOpenType(""); 
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
      setCurrentOpenType(""); 

  };

  return (
    <>
      {activeTab === "Taxes" && (
        <div className="container mx-auto p-4">
          <div className="grid lg:grid-cols-12 md:grid-cols-6 gap-4">
            {/* Taxes on Sale Section */}
            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4 shadow-xl bg-white rounded-lg p-6 border">
                <h1 className="text-xl font-bold">Taxes On Sale</h1>
                <button
                  onClick={() => {
                    setIsSaleOpen(true);
                    setIsPurchaseOpen(false);
                    setCurrentOpenType("Sale");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add
                </button>
              </div>
            </div>

            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4 shadow-xl bg-white rounded-lg p-6 border">
                <h1 className="text-xl font-bold">Purchase Taxes</h1>
                <button
                  onClick={() => {
                    setIsPurchaseOpen(true);
                    setIsSaleOpen(false);
                    setCurrentOpenType("Purchase");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          </div>

          <div>
            {(isSaleOpen || isPurchaseOpen) && (
              <div className="flex-col px-10 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-start z-50">
                <div className="mt-7 bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                  <div className="border-b-2 p-4 flex items-center justify-between">
                    <h2 className="text-lg">
                      {currentOpenType === "Sale"
                        ? "Sale Taxes"
                        : "Purchase Taxes"}
                    </h2>
                    <button className="text-gray-500" onClick={cancelAction}>
                      <FaTimes />
                    </button>
                  </div>
                  <p className="border-b-2 p-4 text-blue-700 font-bold">
                    No tax selected{" "}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 p-4">
                    <div className="mt-3">
                      <label htmlFor="tax" className="block mb-3">
                        Tax:
                      </label>
                      <select
                        id="tax"
                        {...register("choseTax")}
                        value={selectedTax}
                        onChange={(e) => setSelectedTax(e.target.value)}
                        className="border p-2 rounded lg:w-[150px] md:w-[200px] sm:w-[70vw]"
                      >
                        <option value="">-Choose-</option>
                        <option value="Tax 1">Tax 1</option>
                        <option value="Tax 2">Tax 2</option>
                        <option value="Tax 3">Tax 3</option>
                      </select>
                    </div>
                    <div className="mt-3">
                      <label htmlFor="appliedOn" className="block mb-3">
                        Applied On:
                      </label>
                      <select
                        {...register("salePricAdd")}
                        id="appliedOn"
                        value={appliedOn}
                        onChange={(e) => setAppliedOn(e.target.value)}
                        className="border p-2 rounded lg:w-[200px] md:w-[200px] sm:w-[70vw]"
                      >
                        <option value="Sale Price">Sale Price</option>
                        <option value="Cost Price">Cost Price</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddTax(currentOpenType)}
                    className={`flex items-center gap-2 px-4 py-3 mt-10 mx-4 my-8 rounded ${
                      selectedTax ? "bg-green-400 text-white" : "bg-gray-400"
                    }`}
                    disabled={!selectedTax}
                  >
                    <FaPlus />
                    ADD
                  </button>
                  <div className="border-t-2 pt-6 flex justify-end pb-5">
                    <button
                      onClick={cancelAction}
                      className="flex items-center gap-1 mr-5 bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-300"
                    >
                      <FaTimes />
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Displaying Applied Taxes */}
          {taxesApplied.map((tax, index) => (
            <div
              key={index}
              className="flex-col px-10 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-start z-50"
            >
              <div className="mt-7 bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                <div className="border-b-2 p-4 flex items-center justify-between">
                  <h2 className="text-lg">
                    {currentOpenType === "Purchase" ? " Purchase tax  " : "Sale Tax "}
                  </h2>
                  <button
                    className="text-gray-500"
                    onClick={() => handleRemoveTax(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex items-center gap-4 border p-2 mt-4 rounded-lg">
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
                <button
                  onClick={() => handleAddTax(currentOpenType)}
                  className={`flex items-center gap-2 px-4 py-3 mt-10 mx-4 my-8 rounded ${
                    selectedTax ? "bg-green-400 text-white" : "bg-gray-400"
                  }`}
                  disabled={!selectedTax}
                >
                  <FaPlus />
                  ADD
                </button>
                <div className="border-t-2 pt-6 flex justify-end pb-5">
                  <button
                    onClick={() => handleRemoveTax(index)}
                    className="flex items-center gap-1 mr-5 bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-300"
                  >
                    <FaTimes />
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Taxes;
