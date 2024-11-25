import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  changeCategory, 
  setValuesForAttrFromDbSelectForm, 
  setAttributesTableWrapper 
} from "./utils/utils";

const CreateProductPageComponent = ({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  categories,
  reduxDispatch,
  deleteCategory,
  saveAttributeToCatDoc
}) => {
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChoosen, setCategoryChoosen] = useState("");

  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Reset attributes when category changes
    setAttributesTable([]);
    setAttributesFromDb([]);
  }, [categoryChoosen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    // Validate category
    if (!categoryChoosen) {
      setCreateProductResponseState({
        error: "Please choose a category",
      });
      return;
    }
    // Basic form validation
    if (!form.name.value || !form.description.value || !form.count.value || !form.price.value) {
      setValidated(true);
      return;
    }

    // Validate price format
    const price = parseFloat(form.price.value);
    if (isNaN(price) || price <= 0) {
      setCreateProductResponseState({
        error: "Please enter a valid price",
      });
      return;
    }

    // Validate count
    const count = parseInt(form.count.value);
    if (isNaN(count) || count < 0) {
      setCreateProductResponseState({
        error: "Please enter a valid count",
      });
      return;
    }

    try {
      const formInputs = {
        name: form.name.value,
        description: form.description.value,
        count: count,
        price: price,
        category: categoryChoosen,
        attributesTable: attributesTable,
      };

      // Validate images
      if (images) {
        if (images.length > 3) {
          setIsCreating("Maximum 3 images allowed");
          return;
        }
        // Add basic image validation
        for (let file of images) {
          if (file.size > 1024 * 1024 * 5) { // 5MB limit
            setIsCreating("Image size should be less than 5MB");
            return;
          }
          if (!file.type.startsWith('image/')) {
            setIsCreating("Please upload only image files");
            return;
          }
        }
      }

      const data = await createProductApiRequest(formInputs);
      
      if (images) {
        if (process.env.NODE_ENV !== "production") {
          await uploadImagesApiRequest(images, data.productId);
        } else {
          await uploadImagesCloudinaryApiRequest(images, data.productId);
        }
      }

      if (data.message === "product created") {
        navigate("/admin/products");
      }

    } catch (err) {
      setCreateProductResponseState({
        error: err.response?.data?.message || err.response?.data || "An error occurred",
      });
    }
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      changeCategory(e, categories, setAttributesFromDb, setCategoryChoosen);
    }
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const deleteCategoryHandler = () => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Choose category");
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(attrKey.current.value, e.target.value, setAttributesTable);
    }
  }

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  }

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  }

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  }

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen));
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  }

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>
          {createProductResponseState.error && (
            <Alert variant="danger">
              {createProductResponseState.error}
            </Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                name="name" 
                required 
                type="text"
                minLength={3}
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid product name (3-100 characters)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                minLength={10}
                maxLength={1000}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid description (10-1000 characters)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control 
                name="count" 
                required 
                type="number"
                min={0}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid count (minimum 0)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                name="price" 
                required 
                type="number"
                min={0.01}
                step={0.01}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid price (minimum 0.01)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                {categoryChoosen && (
                  <CloseButton onClick={deleteCategoryHandler} />
                )}
              </Form.Label>
              <Form.Select
                id="cats"
                name="category"
                aria-label="Default select example"
                onChange={handleCategorySelect}
                required
              >
                <option value="">Choose category</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={(e)=>setValuesForAttrFromDbSelectForm(e, attrVal, attributesFromDb)}
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </React.Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      onChange={attributeValueSelected}
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton onClick={() => deleteAttribute(item.key)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={!categoryChoosen}
                    placeholder="first choose category"
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    ref={createNewAttrVal}
                    disabled={!categoryChoosen}
                    placeholder="first choose category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enter on one of the fields
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => uploadHandler(e.target.files)}
              />
              {isCreating}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;