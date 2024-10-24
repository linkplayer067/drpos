import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = ({ activeTab }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null); 
 const quillRef = useRef(null);
  const handleGalleryImageChange = (event) => {
    setGalleryImage(URL.createObjectURL(event.target.files[0]));
  };

   const getEditorValue = () => {
     const editor = quillRef.current.getEditor(); 
     const editorContent = editor.getContents(); 
     const editorText = editor.getText();
     const editorHTML = editor.root.innerHTML; 

     console.log("Editor Content (Delta):", editorContent);
     console.log("Editor Text (Plain):", editorText);
     console.log("Editor HTML:", editorHTML);
   };

  return (
    <div>
      {activeTab === "Catalog" && (
        <div className="container mx-auto  p-4">
          <h1 className="text-2xl font-bold mb-6">
            Responsive Rich Text Editor
          </h1>

          {/* Quill Editor */}
          <ReactQuill
            // ref={quillRef}
            // onChange={getEditorValue}
            modules={{
              toolbar: {
                container: [
                  [{ font: [] }, { size: [] }], 
                  ["bold", "italic", "underline", "strike", "blockquote"], 
                  [{ list: "ordered" }, { list: "bullet" }], 
                  [{ align: [] }], 
                  ["link", "image"], 
                  [{ color: [] }, { background: [] }], 
                  ["clean"], 
                ],
                handlers: {
                  link: () => setIsLinkModalOpen(true),
                  image: () => setIsImageModalOpen(true),
                },
              },
            }}
            formats={[
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "align",
              "link",
              "image",
              "color",
              "background",
            ]}
          />

          {/* Gallery Image Upload */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Gallery Images</h2>
            <div className="border-2 p-4 mt-2">
              <label className="block">
                <span className="text-gray-700">Upload Images</span>
                <input
                  type="file"
                  className="mt-2"
                  onChange={handleGalleryImageChange}
                />
              </label>
              {galleryImage && (
                <div className="mt-4">
                  <img
                    src={galleryImage}
                    alt="Uploaded"
                    className="w-40 h-40 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Link Modal */}
          {isLinkModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold mb-4">Insert Link</h3>
                <input
                  type="text"
                  placeholder="Web Address"
                  className="border p-2 w-full mb-3"
                />
                <input
                  type="text"
                  placeholder="Display Text"
                  className="border p-2 w-full mb-3"
                />
                <input
                  type="text"
                  placeholder="Title"
                  className="border p-2 w-full mb-3"
                />
                <div className="flex items-center mb-3">
                  <input type="checkbox" id="newWindow" className="mr-2" />
                  <label htmlFor="newWindow">Open in new window</label>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setIsLinkModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Modal */}
          {isImageModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold mb-4">Insert Image</h3>
                <label className="block mb-3">
                  <span className="text-gray-700">Upload Image</span>
                  <input type="file" className="mt-2" />
                </label>
                <input
                  type="text"
                  placeholder="Or paste a link"
                  className="border p-2 w-full mb-3"
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setIsImageModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEditor;
