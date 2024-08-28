import {useEffect, useState} from "react";
import {getAllProducts} from "../service/ProductService";
import {Link} from "react-router-dom";

function ProductListFunc(){
    const [products,setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [name,setName] = useState("");

    const fetchProducts = async (name) => {
        let  res = await getAllProducts(name);
        res.products.sort((a, b)=> a.quantity - b.quantity)
        setProduct(res.products);
        setCategory(res.category)
    }


    const formatDate =(dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`).toLocaleDateString('vi-VN', {
            day:'2-digit',
            month:'2-digit',
            year:'numeric'
        });
    }

    const getCategoryName = (categoryId) => {

        const category1 = category.find(g => g.categoryId === categoryId);
        return category1 ? category1.name : "Unknown";
    }

    useEffect(() => {
        fetchProducts(name)
    }, [name]);

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <Link to="/create" className="btn btn-primary">Thêm mới</Link>
            </div>
            <div className="mb-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Search by product name"
                />
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Entry Date</th>


                </tr>
                </thead>
                <tbody>
                {products.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{getCategoryName(item.categoryId)}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{formatDate(item.entryDate)}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}
export default ProductListFunc