import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as ProductService from "../service/ProductService";
import {toast} from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";


function ProductCreate(){
    const [category, setCategory] = useState([]);
    const [form,setForm] = useState({
        id: "",
        name : "",
        categoryId: "",
        entryDate :"",
        quantity: 0,
        price :0,
        description: ""
    })
    const navigate = useNavigate();

    const objectValid = {
        id: Yup.string()
            .required("Mã sản phẩm không được để trống")
            .matches(/^PROD-\d{4}$/, "Mã sản phẩm phải theo định dạng PROD-XXXX với X là các số"),
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự")
            .max(100,"Tên không được dài hơn 100 ký tự"),
        categoryId: Yup.string()
            .required("Thể loại không được để trống"),
        entryDate: Yup.date()
            .required("Ngày nhập không được để trống")
            .max(new Date(),"Ngày nhập không được lớn hơn ngày hiện tại"),
        quantity: Yup.number()
            .required("Số lượng không được để trống")
            .min(1, "Số lượng phải lớn hơn 0")
            .integer("Số lượng phải là một số nguyên"),
        price: Yup.number()
            .required("Giá không được để trống")
            .min(1, "Giá phải lớn hơn 0")
    };

    const saveProduct = async (value) => {
        value.quantity = +value.quantity;
        let isSuccess = await ProductService.saveProduct(value);
        if (isSuccess){
            toast.success("Thêm mới thành công");
            navigate("/products");
        } else {
            toast.error("Thêm mới thất bại")
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getAllProducts();
                setCategory(res.category);
            } catch (error){
                toast.error("Lấy danh sách thể loại sản phẩm thất bại")
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Thêm Sản Phẩm Mới</h1>
            <Formik initialValues={form} onSubmit={saveProduct} validationSchema={Yup.object(objectValid)}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">Product ID</label>
                        <Field id="id" name="id" className="form-control"/>
                        <ErrorMessage name="id" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field id="name" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label">Category</label>
                        <Field as="select" id="categoryId" name="categoryId" className="form-control">
                            <option value="">Chọn thể loại</option>
                            {category.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="entryDate" className="form-label">Entry Date</label>
                        <Field type="date" id="entryDate" name="entryDate" className="form-control"/>
                        <ErrorMessage name="entryDate" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <Field type="number" id="quantity" name="quantity" className="form-control"/>
                        <ErrorMessage name="quantity" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Price</label>
                        <Field type="number" id="price" name="price" className="form-control"/>
                        <ErrorMessage name="price" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Description</label>
                        <Field as="textarea" id="description" name="description" className="form-control"/>
                        <ErrorMessage name="description" component="div" className="text-danger"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                </Form>
            </Formik>
        </div>
    );
}

export default ProductCreate;