import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SummaryApi from "../common";


const ProductDetails = () => {
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: ''
    });

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);

    console.log('product id:',params.id);
    console.log('product Url:', SummaryApi.productDetails.url.concat("/"+params.id))

    const fetchProductDetails = async ()=>{
        setLoading(true);
        try {
            const response = fetch(SummaryApi.productDetails.url.concat("/"+params.id));
            const responseData = (await response).json();
            setData(responseData.data);
        } catch (error) {
            console.log('fetch failed product details');
        } finally{
            setLoading(true)
        }
    }
    useEffect(()=>{
        fetchProductDetails();
    },[])

    return (
        <div className="min-h-[2000px]">
            {/**product Image */}
            <div>
                <div className="">
                    {
                        loading ? (
                            <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                {
                                    productImageListLoading.map((el,index) =>{
                                        return (
                                            <div key={index} className="h-20 w-20 bg-slate-400 rounded">
                                                hello
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                                {
                                    data.map((el,index) =>{
                                        return (
                                            <div key={index} className="h-20 w-20 bg-slate-400 rounded">
                                                hello
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;