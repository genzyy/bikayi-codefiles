import React, { useState, useEffect } from 'react';

const Specials = ({ d }) => {
  const [specials, setSpecials] = useState([]);

  const counter = new Map();

  useEffect(() => {
    const getSpecials = () => {
      const temp = [];
      d.prizes.forEach((element) => {
        if (element.laureates !== undefined) {
          element.laureates.forEach((awardee) => {
            let name = `${awardee.firstname} ${awardee.surname}`;
            if (counter.get(name) === undefined) {
              counter.set(name, 1);
            } else {
              counter.set(name, counter.get(name) + 1);
              if (counter.get(name) > 1 && awardee.surname !== undefined) {
                temp.push(name);
              }
            }
          });
        }
        setSpecials(temp);
      });
    };
    getSpecials();
  }, [d]);

  return (
    <>
      {' '}
      <h1 className="mt-10 text-xl font-bold underline">
        Special Awardees (Won more than 1 nobel prize)
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 bg-gray">
        {specials.map((p, index) => {
          return (
            <div
              key={index}
              className="w-full px-4 py-2 m-5 shadow-lg rounded-lg bg-white"
            >
              <h1 className="text-xl font-semibold capitalize">{p}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Specials;
