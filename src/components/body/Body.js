import React, { useState, useEffect } from 'react';

export const Body = () => {

    const [name, setName] = useState('');
    const [response, setResponse] = useState('');
    const [isShowTable, setIsShowTable] = useState(false);
    const [isShowHistory, setIsShowHistory] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {

    }, [isShowTable])

    const handledOnShowTable = () => setIsShowHistory(!isShowHistory);

    const searchName = async () => {
        let regex = new RegExp("^[a-zA-Z]+$");
        if (regex.test(name.data)) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            };
            fetch(`https://api.nationalize.io?name=${name.data}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.country[0]);
                    setResponse(data);
                    setIsShowTable(true);
                    history.push(name);
                })
                .catch(error => alert('Invalid value, say a real name'));
        } else {
            alert('You need to fill in the name field');
        }
    }

    return (
        <>
            <div className='justify-center container mx-auto mt-5 flex flex-row'>
                <div className='flex-1 flex flex-row'>
                    <button onClick={handledOnShowTable} className='w-28 bg-slate-600 h-12 rounded text-white font-medium'>View History</button>
                    {isShowHistory && history.length > 0 &&
                        <div className="relative overflow-x-auto max-h-60">
                            <table className="w-52 text-sm text-left text-gray-400 ml-2">
                                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Names searched
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bg-gray-800 border-gray-700 flex flex-col">
                                        {history.map(item => (
                                            <td className="px-6 py-4">
                                                {item.data}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className='flex-1'>
                    <img src="https://userscontent2.emaze.com/images/066977e3-8b6a-4a72-a2de-603f286f863b/b5d5f94e5602f3898afeddb2f4a9de70.gif"
                        className='w-64 h-64 mx-auto' />
                </div>
                <div className='flex-1'></div>
            </div>
            <div className='container mx-auto text-center'>
                <label className='h-8 font-medium'>
                    Name:
                    <input type="text" placeholder='Search for a name' onChange={(e) => setName({ data: e.target.value })} className='border-black border ml-2 pl-2 rounded-md w-72 mr-2 h-8 justify-center font-medium' />
                </label>
                <button onClick={searchName} className='rounded-md bg-gray-700 w-20 text-white h-8 font-medium'>Search</button>
            </div>

            {isShowTable &&
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-10">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                {response.country.map(item => (
                                    <th scope="col" className="px-6 py-3">
                                        {item.country_id}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b bg-gray-800 border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {response.name}
                                </th>
                                {response.country.map(item => (
                                    <td className="px-6 py-4">
                                        {item.probability.toString().substr(0, 6)}%
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

        </>
    )
}
