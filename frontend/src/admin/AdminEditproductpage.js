import {
  Button,
  Col,
  Container,
  Row,
  Table,
  CloseButton,
  Image,
  Alert,
} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Fragment, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const style_red_icon = {
  cursor: "pointer",
  top: "-10px",
  left: "5px",
};

function AdminEditproductpage({
  category_data, //ALL
  fetch_product,
  updatae_edit_product,
  dispatch,
  Save_Attr,
  deleteimagefunc,
  uploadimag,
}) {
  const [validated, setValidated] = useState(false);
  const [product, setproduct] = useState({});
  const [attrfromdb, setattrfromdb] = useState([]);
  const [attrtable, setattrtable] = useState([]);
  const [choosencategory, setchoosencategory] = useState("Choose category");
  const [attroption, setattroption] = useState(false);
  const [valueoption, setvalueoption] = useState(false);
  const [deleteimage, setdeleteimage] = useState(false);
  const [uploadimage, setuploadimage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const attrkey = useRef(null);
  const attrvalue = useRef(null);
  const createattr = useRef(null);
  const createvalue = useRef(null);

  const Deleteattr = (key) => {
    setattrtable((table) => table.filter((item) => item.key !== key));
    console.log(attrtable);
  };

  const setvaluefromattrselection = (e) => {
    if (e.target.value !== "Choose attribute") {
      var selectattr = attrfromdb.find((item) => item.key === e.target.value);

      let valuesofattrkey = attrvalue.current;
      if (selectattr && selectattr.value.length > 0) {
        while (valuesofattrkey.options.length) {
          valuesofattrkey.remove(0);
        }
        valuesofattrkey.options.add(new Option("Choose attributes"));
        selectattr.value.map((item) => {
          valuesofattrkey.options.add(new Option(item));
          return "";
        });
      }
    }
  };

  const cahngeselectedvalue = (e) => {
    if (e.target.value !== "Choose attributes") {
      setattrtavlewrapper(attrkey.current.value, e.target.value);
    }
  };

  const setattrtavlewrapper = (key, value) => {
    setattrtable((attr) => {
      if (attr.length !== 0) {
        var keyisexist = false;
        let modifyedtable = attr.map((item) => {
          if (item.key === key) {
            keyisexist = true;
            item.value = value;
            return item;
          } else {
            return item;
          }
        });
        if (keyisexist) return [...modifyedtable];
        else return [...modifyedtable, { key: key, value: value }];
      } else {
        return [{ key: key, value: value }];
      }
    });
  };

  const changecatgory = (e) => {
    const categormainname = e.target.value.split("/")[0];
    const maincategoryalldata = category_data?.find(
      (item) => item.name === categormainname
    );
    console.log(maincategoryalldata);
    if (maincategoryalldata && maincategoryalldata.attrs) {
      setattrfromdb(maincategoryalldata.attrs);
    }
    setchoosencategory(e.target.value);
  };

  //on handlsubmit we will make update for product
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
      count: form.count.value,
      category: form.category.value,
      attribute: attrtable,
    };

    if (event.currentTarget.checkValidity() === true) {
      updatae_edit_product(id, formInputs)
        .then((res) => {
          navigate("/AdminProductPage");
        })
        .catch((err) => console.log(err));
    }

    setValidated(true);
  };

  useEffect(() => {
    fetch_product(id).then((res) => {
      setproduct(res.data);
    });
  }, [id, fetch_product, deleteimage, uploadimage]);

  useEffect(() => {
    let categoryofeditproduct = category_data?.find(
      (item) => item.name === product.category
    );

    if (categoryofeditproduct) {
      const maincategoryname = categoryofeditproduct.name.split("/")[0];
      console.log(maincategoryname);
      const dataofmaincategory = category_data?.find(
        (categoryofeditproduct) =>
          categoryofeditproduct.name === maincategoryname
      );
      console.log(dataofmaincategory);
      if (dataofmaincategory && dataofmaincategory.attrs.length > 0) {
        setattrfromdb(dataofmaincategory.attrs);
      }
    }
    setchoosencategory(product.category);
    setattrtable(product.attrs);
  }, [product]);

  const onkeydown = (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handlecreateattr = (e) => {
    if (e.target.value) {
      setattroption(e.target.value);
      CreateNewOpton(e);
    }
    return;
  };
  const handlecreatevalue = (e) => {
    if (e.target.value) {
      setvalueoption(e.target.value);
      CreateNewOpton(e);
    }
    return;
  };
  const CreateNewOpton = (e) => {
    if (e.keyCode && e.keyCode === 13 && attroption && valueoption) {
      console.log(choosencategory, attroption, valueoption);
      dispatch(Save_Attr(attroption, valueoption, choosencategory));
      setattrtavlewrapper(createattr.current.value, createvalue.current.value);
      e.target.value = "";
      createattr.current.value = "";
      createvalue.current.value = "";
      setattroption(false);
      setvalueoption(false);
    }
  };

  return (
    <Container>
      <Row className="create-prduct-form" md={6}>
        <Col md={6}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LinkContainer to="/AdminProductPage">
              <Button variant="primary"> go back </Button>
            </LinkContainer>
            <h3> Create New Product</h3>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => onkeydown(e)}
          >
            <Form.Group
              as={Col}
              controlId="new-item"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>new product</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="price"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>new price</Form.Label>
              <Form.Control
                name="price"
                required
                type="number"
                defaultValue={product.price}
              />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="discription"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>Discription</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="stock-account"
              style={{ marginBottom: "3px" }}
            >
              <Form.Label>number in stoke</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
              <Form.Control.Feedback>good </Form.Control.Feedback>
            </Form.Group>
            <Form.Text>
              Category <CloseButton aria-label="Hide" /> (remove selected)
            </Form.Text>
            <Form.Select
              required
              name="category"
              aria-label="Default select example"
              style={{ marginBottom: "3px" }}
              onChange={changecatgory}
            >
              <option value="Choose category">Choose category</option>
              {category_data &&
                category_data?.map((category, index) => {
                  return product.category === category.name ? (
                    <option selected key={index} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
            </Form.Select>
            {attrfromdb.length > 0 && (
              <Row>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formBasicAttributes"
                    style={{ marginBottom: "3px" }}
                    className="mb-3"
                  >
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrkey}
                      onChange={setvaluefromattrselection}
                      disabled={choosencategory === "Choose category"}
                    >
                      <option>Choose attribute</option>
                      {attrfromdb?.map((item, index) => (
                        <Fragment key={index}>
                          <option key={item.key} value={item.key}>
                            {item.key}
                          </option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                    style={{ marginBottom: "3px" }}
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrvalue}
                      onChange={cahngeselectedvalue}
                      disabled={choosencategory === "Choose category"}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            {/* //////////////////////////////////// */}
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  style={{ marginBottom: "3px" }}
                >
                  <Form.Label>Create new Atribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    onKeyUp={handlecreateattr}
                    ref={createattr}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                  style={{ marginBottom: "3px" }}
                >
                  <Form.Label>Atribute Value</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    onKeyUp={handlecreatevalue}
                    ref={createvalue}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* //////////////////////////////// */}
            {attrtable && attrtable.length > 0 && (
              <Table hover>
                <thead>
                  <tr>
                    <th>Atribute</th>
                    <th>vale</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {attrtable.map((item, index) => (
                    <tr key={index}>
                      <td>{item.key}</td>
                      <td>{item.value}</td>
                      <td>
                        <CloseButton
                          aria-label="Hide"
                          onClick={() => Deleteattr(item.key)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Form.Group controlId="image" className="mb-3">
              <Alert variant="info">
                {" "}
                After typing atribute please hit enter
              </Alert>
              <Form.Label>images</Form.Label>
              <Row style={{ display: "flex", flexDirection: "row" }}>
                {product?.images?.map((image, index) => (
                  <Col key={index} md={2} style={{ position: "relative" }}>
                    <Image
                      src={image.path ? image.path : " try to load image ."}
                      alt="name_of_image"
                      fluid
                      style={{ margin: 2 }}
                    />
                    <i
                      className="bi bi-x-circle-fill "
                      style={{
                        color: "red",
                        position: "absolute",
                        ...style_red_icon,
                      }}
                      onClick={() =>
                        deleteimagefunc(image.path, id).then((data) => {
                          setdeleteimage(!deleteimage);
                        })
                      }
                    ></i>
                  </Col>
                ))}
              </Row>

              <Form.Control
                type="file"
                multiple
                size="sm"
                onChange={(e) =>
                  uploadimag(e.target.files, id)
                    .then((data) => {
                      setuploadimage(!uploadimage);
                    })
                    .catch((error) => {
                      console.error(error);
                    })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {" "}
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditproductpage;
