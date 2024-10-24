import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProductGeneral from "../../Components/ProductsTabps/ProductGeneral";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import ProductDetailTab from "../../Components/ProductsTabps/ProductDetailTab";
import { FaPlus } from "react-icons/fa6";
import MyEditor from "../../Components/ProductsTabps/ProductCatalog";
import ActiveLog from "./ActiveLog";
import StockLevel from "../../Components/ProductsTabps/StockLevel";
import Taxes from "../../Components/ProductsTabps/ProductTaxes";
import MultiplePackings from "../../Components/ProductsTabps/MultiplePackings";

const ListProduc = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [showVariantTab, setShowVariantTab] = useState(false);
  


 const methods = useForm();
 const {
   register,
   formState: { errors },
   handleSubmit,
   reset,
 } = methods;

 const onSubmit = (data) => {
   console.log(data);
 };

  return (
    <FormProvider {...methods}>
      <div className="">
        <div
          className={`relative flex min-h-screen ${
            isOpen ? "fixed right-10" : "right-0"
          }`}
        >
          <div
            className={`transition-all mt-10 duration-300 bg-white shadow-2xl flex-grow 
          ${isOpen ? "ml-96" : "ml-28 mr-10"} w-full`}
          >
            <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
              Products - Add
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Tabs */}
              <div className="flex gap-6 flex-wrap border-b-2 px-6">
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "General"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("General")}
                >
                  General
                </button>

                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Detail"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Detail")}
                >
                  Detail
                </button>
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Custom Fields"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Custom Fields")}
                >
                  Custom Fields
                </button>
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Multiple Packings/SKUs"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Multiple Packings/SKUs")}
                >
                  Multiple Packings/SKUs
                </button>
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Catalog"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Catalog")}
                >
                  Catalog
                </button>
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Stock Level"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Stock Level")}
                >
                  Stock Level
                </button>
                {showVariantTab && (
                  <button
                    type="button"
                    className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                      activeTab === "Product Variant"
                        ? "border-b-4 border-green-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("Product Variant")}
                  >
                    Product Variant
                  </button>
                )}
                <button
                  type="button"
                  className={`px-4 py-4 focus:outline-none text-xl font-bold ${
                    activeTab === "Taxes"
                      ? "border-b-4 border-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Taxes")}
                >
                  Taxes
                </button>
              </div>

              {/* General Tab */}
              <ProductGeneral
                setShowVariantTab={setShowVariantTab}
                register={register}
                errors={errors}
                activeTab={activeTab}
              />

              <ProductDetailTab
                setShowVariantTab={setShowVariantTab}
                register={register}
                errors={errors}
                activeTab={activeTab}
              />
              <div className="px-6 ">
                {activeTab === "Custom Fields" && (
                  <div className="shadow-xl rounded-lg  bg-white w-full max-w-2xl border	">
                    <h1 className="text-2xl px-6 pt-4 text-gray-600 font-bold border-b-4 pb-6">
                      Add Fields
                    </h1>

                    <div className="border-b-4 pb-10">
                      <p className="pt-8 text-xl px-6">
                        Field <span className="text-red-500">*</span>
                      </p>
                      <select
                        {...register("addFeild")}
                        className="w-full max-w-72 mx-6 mt-3	 border-4 py-3 px-5 rounded-lg"
                      >
                        <option>-Chose-</option>
                        <option>-Chose-1</option>
                        <option>-Chose-2</option>
                      </select>
                    </div>
                    <div className="flex itmes-center justify-end gap-4 mr-8 mt-6 pb-6">
                      <button className="bg-gray-400 text-white text-lg px-6 py-3 rounded flex items-center gap-4 ">
                        <FaPlus className="text-xl font-bold" />
                        ADD
                      </button>
                      <button className="bg-orange-500 text-white text-lg px-6 py-3 rounded flex items-center gap-4 ">
                        <IoClose className="text-xl font-bold" />
                        CLOSE
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <MultiplePackings activeTab={activeTab} />
              <MyEditor
                activeTab={activeTab}
                register={register}
                errors={errors}
              />
              <StockLevel activeTab={activeTab} />
              {activeTab === "Product Variant" && showVariantTab && (
                <div>Product Variant Content</div>
              )}
              <Taxes activeTab={activeTab} />

              {/* Submit Button */}
              <div className="flex flex-wrap items-center gap-6 justify-end border-t-4 pt-8 pb-10 pr-10 mt-12">
                <button
                  type="submit"
                  className="bg-green-500 text-white text-lg px-6 py-3 rounded flex items-center gap-4"
                >
                  <IoDocumentTextOutline className="text-xl" />
                  SAVE AND CLOSE
                </button>
                <button
                  type="button"
                  className="bg-orange-500 text-white text-lg px-6 py-3 rounded flex items-center gap-4"
                  onClick={() => reset()}
                >
                  <IoClose className="text-xl font-bold" />
                  CLOSE
                </button>
              </div>
            </form>
          </div>
        </div>
        <ActiveLog isOpen={isOpen} />
      </div>
    </FormProvider>
  );
};

export default ListProduc;
