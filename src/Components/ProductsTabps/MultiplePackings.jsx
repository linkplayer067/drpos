import React, { useState } from "react";
import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const MultiplePackings = ({ activeTab }) => {
    const { register, setValue } = useFormContext();
  const [packings, setPackings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const symbols = ["kg", "mg", "g", "dz", "gm"];

  const onSubmit = (data) => {
    if (isEditing) {
      const updatedPackings = [...packings];
      updatedPackings[editIndex] = data;
      setPackings(updatedPackings);
      setIsEditing(false);
    } else {
      setPackings([...packings, data]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const packing = packings[index];

    Object.keys(packing).forEach((key) => {
      setValue(key, packing[key]); 
    });

    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const updatedPackings = packings.filter((_, i) => i !== index);
    setPackings(updatedPackings);
  };

    return (
      <div>
        {activeTab === "Multiple Packings/SKUs" && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse mx-6">
              <thead>
                <tr>
                  <th className=" py-2 min-w-72 text-start px-5 border">
                    Code
                  </th>
                  <th className=" py-2 min-w-72 text-start px-5 border">
                    Name
                  </th>
                  <th className="py-2 min-w-32 text-start px-4 border">
                    Short Name
                  </th>
                  <th className="py-2  min-w-26 text-start px-4  border">
                    Symbol
                  </th>
                  <th className=" py-2 min-w-40 text-start px-4 border">
                    Fractional Unit
                  </th>
                  <th className="py-2  min-w-22 text-start px-4  border">
                    SKU
                  </th>
                  <th className="py-2  min-w-16 text-start px-4  border">
                    Weight
                  </th>
                  <th className=" py-2 min-w-16 text-start px-4  border">
                    Height
                  </th>
                  <th className="py-2  min-w-16 text-start px-4 border">
                    Width
                  </th>
                  <th className="py-2 min-w-16 text-start px-4  border">
                    Length
                  </th>
                  <th className="py-2  min-w-30 text-start px-4 border">
                    Barcode
                  </th>
                  <th className="py-2 min-w-44 text-start px-4 border">
                    Conversion Factor
                  </th>
                  <th className="py-2 min-w-44 text-start px-4  border">
                    Purchase Price
                  </th>
                  <th className="py-2 min-w-36 text-start px-4  border">
                    Sale Price
                  </th>
                  <th className="py-2 min-w-52 text-start px-4 border">
                    Maximum Retail Price
                  </th>
                  <th className="py-2  min-w-72 text-start px-4 border">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {packings.map((packing, index) => (
                  <tr key={index}>
                    <td className="py-2 border">{packing.code}</td>
                    <td className="px-4 py-2 border">{packing.name}</td>
                    <td className="px-4 py-2 border">{packing.shortName}</td>
                    <td className="px-4 py-2 border">{packing.symbol}</td>
                    <td className="px-4 py-2 border">
                      {packing.fractionalUnit}
                    </td>
                    <td className="px-4 py-2 border">{packing.sku}</td>
                    <td className="px-4 py-2 border">{packing.weight}</td>
                    <td className="px-4 py-2 border">{packing.height}</td>
                    <td className="px-4 py-2 border">{packing.width}</td>
                    <td className="px-4 py-2 border">{packing.length}</td>
                    <td className="px-4 py-2 border">{packing.barcode}</td>
                    <td className="px-4 py-2 border">
                      {packing.ConversionFactor}
                    </td>
                    <td className="px-4 py-2 border">
                      {packing.PurchasePrice}
                    </td>
                    <td className="px-4 py-2 border">{packing.SalePrice}</td>
                    <td className="px-4 py-2 border">{packing.Maximum}</td>
                    <td className="min-w-40 py-2 border">
                      <FaEdit
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 cursor-pointer mx-1"
                      />
                      <FaTrashAlt
                        onClick={() => handleDelete(index)}
                        className="text-red-500 cursor-pointer mx-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex mt-2">
              <input
                type="text"
                {...register("code1")}
                placeholder="Code"
                className="p-2 min-w-72"
              />
              <input
                type="text"
                {...register("name2")}
                placeholder="Name"
                className="border p-2 min-w-72"
              />
              <input
                type="text"
                {...register("shortName")}
                placeholder="Short Name"
                className="border p-2 min-w-32"
              />
              <select {...register("symbol")} className="border p-2 min-w-26">
                <option value="">Select</option>
                {symbols.map((sym) => (
                  <option key={sym} value={sym}>
                    {sym}
                  </option>
                ))}
              </select>
              <select
                {...register("fractionalUnit")}
                className="border p-2 min-w-32"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <input
                type="text"
                {...register("sku")}
                placeholder="SKU"
                className="border p-2 min-w-16"
              />
              <input
                type="number"
                {...register("weight")}
                placeholder="Weight"
                className="border p-2 min-w-16"
              />
              <input
                type="number"
                {...register("height")}
                placeholder="Height"
                className="border p-2 min-w-16"
              />
              <input
                type="number"
                {...register("width")}
                placeholder="Width"
                className="border p-2 min-w-16"
              />
              <input
                type="number"
                {...register("length")}
                placeholder="Length"
                className="border p-2 min-w-16"
              />
              <input
                type="number"
                {...register("barcode")}
                placeholder="Barcode"
                className="border p-2 min-w-16"
              />
              <input
                type="text"
                {...register("ConversionFactor")}
                placeholder="Conversion Factor"
                className="border p-2 min-w-22"
              />
              <input
                type="number"
                {...register("PurchasePrice")}
                placeholder="Purchase Price"
                className="border p-2 min-w-22"
              />
              <input
                type="number"
                {...register("SalePrice")}
                placeholder="Sale Price"
                className="border p-2 min-w-22"
              />
              <input
                type="number"
                {...register("Maximum")}
                placeholder="Maximum Retail Price"
                className="border p-2 min-w-48"
              />
              <button
                type="submit"
                onClick={onSubmit}
                className="bg-green-500 text-white p-2 rounded"
              >
                <FaCheck />
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default MultiplePackings;
