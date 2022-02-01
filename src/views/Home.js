import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';

const Home = () => {
  const [data, setData] = useState({
    prizes: [
      {
        laureates: []
      }
    ]
  });
  const [categories, setCategories] = useState([]);

  const [filterYear, setFilterYear] = useState('all');

  const [filterCat, setFilterCat] = useState('all');

  const getData = () => {
    fetch('http://api.nobelprize.org/v1/prize.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        getCategories(data);
      });
  };

  const getCategories = (data) => {
    const tempCat = [];
    data.prizes.forEach((element) => {
      if (!tempCat.includes(element.category)) tempCat.push(element.category);
    });
    console.log(tempCat);
    setCategories(tempCat);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Filter
        categories={categories}
        filterCat={filterCat}
        filterYear={filterYear}
        setFilterCat={setFilterCat}
        setFilterYear={setFilterYear}
      />
      <div className="grid grid-cols-3 gap-3 bg-gray">
        {data.prizes.map((p, index) => {
          if (
            filterCat === 'all' &&
            filterYear === 'all' &&
            categories.includes(p.category)
          ) {
            return (
              <div
                key={index}
                className="w-full px-4 py-2 m-5 shadow-lg rounded-lg bg-white"
              >
                <h1 className="uppercase text-xl font-semibold m-3 underline">{`${p.year} ${p.category}`}</h1>
                <p className="text-md font-medium capitalize">The Awardees:</p>
                <div className="my-3">
                  {p.laureates &&
                    p.laureates.map((u, uindex) => (
                      <p
                        key={uindex}
                        className="italic capitalize text-sm font-medium pl-3"
                      >{`${uindex + 1}. ${u.firstname} ${u.surname}`}</p>
                    ))}
                </div>
              </div>
            );
          } else if (filterCat !== 'all' && filterYear !== 'all') {
            if (p.category === filterCat && p.year === filterYear) {
              return (
                <div
                  key={index}
                  className="w-full px-4 py-2 m-5 shadow-lg rounded-lg bg-white"
                >
                  <h1 className="uppercase text-xl font-semibold m-3 underline">{`${p.year} ${p.category}`}</h1>
                  <p className="text-md font-medium capitalize">
                    The Awardees:
                  </p>
                  <div className="my-3">
                    {p.laureates &&
                      p.laureates.map((u, uindex) => (
                        <p
                          key={uindex}
                          className="italic capitalize text-sm font-medium pl-3"
                        >{`${uindex + 1}. ${u.firstname} ${u.surname}`}</p>
                      ))}
                  </div>
                </div>
              );
            }
          } else if (filterCat !== 'all') {
            if (p.category === filterCat) {
              return (
                <div
                  key={index}
                  className="w-full px-4 py-2 m-5 shadow-lg rounded-lg bg-white"
                >
                  <h1 className="uppercase text-xl font-semibold m-3 underline">{`${p.year} ${p.category}`}</h1>
                  <p className="text-md font-medium capitalize">
                    The Awardees:
                  </p>
                  <div className="my-3">
                    {p.laureates &&
                      p.laureates.map((u, uindex) => (
                        <p
                          key={uindex}
                          className="italic capitalize text-sm font-medium pl-3"
                        >{`${uindex + 1}. ${u.firstname} ${u.surname}`}</p>
                      ))}
                  </div>
                </div>
              );
            }
          } else if (filterYear !== 'all') {
            if (p.year === filterYear) {
              return (
                <div
                  key={index}
                  className="w-full px-4 py-2 m-5 shadow-lg rounded-lg bg-white"
                >
                  <h1 className="uppercase text-xl font-semibold m-3 underline">{`${p.year} ${p.category}`}</h1>
                  <p className="text-md font-medium capitalize">
                    The Awardees:
                  </p>
                  <div className="my-3">
                    {p.laureates &&
                      p.laureates.map((u, uindex) => (
                        <p
                          key={uindex}
                          className="italic capitalize text-sm font-medium pl-3"
                        >{`${uindex + 1}. ${u.firstname} ${u.surname}`}</p>
                      ))}
                  </div>
                </div>
              );
            }
          }
        })}
      </div>
    </>
  );
};

export default Home;
