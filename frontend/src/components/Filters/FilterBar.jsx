import { useEffect, useState } from "react";
import { useDataset } from "../../context/DatasetContext";

function FilterBar() {

    const {

        datasetInfo,

        filteredData,

        setFilteredData

    } = useDataset();

    const [region, setRegion] = useState("All");

    const [category, setCategory] = useState("All");

    const [product, setProduct] = useState("All");

    useEffect(() => {

        if (!datasetInfo) return;

        let data = [...datasetInfo.data];

        if (region !== "All") {

            data = data.filter(
                row => row.Region === region
            );

        }

        if (category !== "All") {

            data = data.filter(
                row => row.Category === category
            );

        }

        if (product !== "All") {

            data = data.filter(
                row => row.Product === product
            );

        }

        setFilteredData(data);

    }, [

        region,

        category,

        product,

        datasetInfo

    ]);

    if (!datasetInfo) return null;

    const regions = [

        "All",

        ...new Set(
            datasetInfo.data.map(row => row.Region)
        )

    ];

    const categories = [

        "All",

        ...new Set(
            datasetInfo.data.map(row => row.Category)
        )

    ];

    const products = [

        "All",

        ...new Set(
            datasetInfo.data.map(row => row.Product)
        )

    ];

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Dashboard Filters

            </h2>

            <div className="grid grid-cols-3 gap-6">

                <select

                    className="border rounded-xl p-3"

                    value={region}

                    onChange={(e)=>setRegion(e.target.value)}

                >

                    {regions.map(r=>(

                        <option key={r}>{r}</option>

                    ))}

                </select>

                <select

                    className="border rounded-xl p-3"

                    value={category}

                    onChange={(e)=>setCategory(e.target.value)}

                >

                    {categories.map(c=>(

                        <option key={c}>{c}</option>

                    ))}

                </select>

                <select

                    className="border rounded-xl p-3"

                    value={product}

                    onChange={(e)=>setProduct(e.target.value)}

                >

                    {products.map(p=>(

                        <option key={p}>{p}</option>

                    ))}

                </select>

            </div>

        </div>

    );

}

export default FilterBar;