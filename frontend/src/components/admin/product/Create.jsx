import React from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useState, useRef, useMemo } from "react";
import { set, useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import { Placeholder } from "react-bootstrap";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const saveProduct = async (data) => {
    console.log(data);
    const formData = { ...data, description: content, gallery: gallery };
    setDisable(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          Object.keys(result.errors).forEach((key) => {
            setError(key, { message: result.errors[key][0] });
          });
        }
      });
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setCategories(result.data);
        } else {
          console.error("Failed to fetch categories");
        }
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setBrands(result.data);
        } else {
          console.error("Failed to fetch brands");
        }
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);

    const res = await fetch(`${apiUrl}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        gallery.push(result.data.id);
        setGallery(gallery);
        galleryImages.push(result.data.image_url);
        setGalleryImages(galleryImages);
        setDisable(false);
        e.target.value = "";
      });
  };

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter((img) => img !== image);
    setGalleryImages(newGallery);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Title
                    </label>
                    <input
                      {...register("title", {
                        required: "The title field is required",
                      })}
                      type="text"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {String(errors.title.message)}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <select
                          {...register("category_id", {
                            required: "Please select the category",
                          })}
                          className={`form-control ${
                            errors.category_id && "is-invalid"
                          }`}
                        >
                          <option value="">Select a category</option>
                          {categories &&
                            categories.map((category) => (
                              <option
                                key={`category-${category.id}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            ))}
                        </select>
                        {errors.category_id && (
                          <p className="invalid-feedback">
                            {String(errors.category_id.message)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brand
                        </label>
                        <select
                          {...register("brand_id")}
                          className="form-control"
                        >
                          <option value="">Select a brand</option>
                          {brands &&
                            brands.map((brand) => (
                              <option
                                value={brand.id}
                                key={`brand-${brand.id}`}
                              >
                                {brand.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Is Featured
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "This field is required",
                      })}
                      className={`form-control ${
                        errors.is_featured && "is-invalid"
                      }`}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {String(errors.is_featured?.message)}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      {...register("short_description")}
                      rows={3}
                      className="form-control"
                      placeholder="Short Description"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "The price field is required",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.price && "is-invalid"
                          }`}
                          placeholder="Price"
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {String(errors.price.message)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          {...register("compare_price")}
                          type="text"
                          className="form-control"
                          placeholder="Discounted Price"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          {...register("sku", {
                            required: "The sku field is required",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.sku && "is-invalid"
                          }`}
                          placeholder="Sku"
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {String(errors.sku.message)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          {...register("barcode")}
                          type="text"
                          className="form-control"
                          placeholder="Barcode"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Quantity
                        </label>
                        <input
                          {...register("quantity")}
                          type="text"
                          className="form-control"
                          placeholder="Quantity"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Status
                        </label>
                        <select
                          {...register("status", {
                            required: "Please select the status",
                          })}
                          className={`form-control ${
                            errors.status && "is-invalid"
                          }`}
                        >
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {String(errors.status?.message)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFile}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      {galleryImages &&
                        galleryImages.map((image, index) => (
                          <div className="col-md-3" key={`image-${index}`}>
                            <div className="card shadow">
                              <img src={image} alt="" className="w-100" />
                            </div>
                            <button
                              className="btn btn-danger mt-3 w-100"
                              onClick={() => deleteImage(image)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-5"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
