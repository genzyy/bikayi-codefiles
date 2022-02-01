import React, { useState, useEffect, useRef } from 'react';
import { createPopper } from '@popperjs/core';

const Filter = ({
  categories,
  filterCat,
  filterYear,
  setFilterCat,
  setFilterYear
}) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const ddDiv = useRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'left-start'
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    const checkIfClickedOut = (event) => {
      if (dropdownPopoverShow && !ddDiv.current.contains(event.target))
        closeDropdownPopover();
    };

    document.addEventListener('mousedown', checkIfClickedOut);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOut);
    };
  }, [dropdownPopoverShow]);

  return (
    <div className=" grid grid-cols-3 gap-3">
      <div>
        <span className="flex">
          <h1 className="capitalize mx-1 text-md">Filter with year</h1>
          <button
            className="text-xs rounded-md shadow-sm text-white bg-black py-1 px-2"
            onClick={() => {
              setFilterYear('all');
            }}
          >
            Clear Year Filter (Set to {filterYear})
          </button>
        </span>
        <input
          type="range"
          className="
      form-range
      appearance-none
      w-full
      h-6
      p-4
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none bg-gray-300 rounded-md
    "
          id="customRange1"
          min="1900"
          max="2018"
          style={{ backgroundColor: 'rgb(229 231 235)' }}
          onChange={(e) => {
            setFilterYear(e.target.value);
          }}
        />
      </div>
      <div>
        <h1 className="capitalize mx-1 text-md">Filter with year</h1>
        <div
          className="bg-gray-600 rounded-lg shadow-sm p-1 cursor-pointer"
          style={{ backgroundColor: 'rgb(229 231 235)' }}
          ref={ddDiv}
          onClick={(e) => {
            e.preventDefault();
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <a
            className="text-gray-600 text-sm py-2 px-4"
            href="#pablo"
            ref={btnDropdownRef}
          >
            {filterCat}
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? 'block ' : 'hidden ') +
              'bg-white text-base z-50 float-left py-2 list-none text-left rounded dropdown-shadow min-w-48'
            }
          >
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              onClick={(e) => {
                e.preventDefault();
                setFilterCat('all');
                closeDropdownPopover();
              }}
            >
              All
            </a>
            {categories.map((cat, index) => (
              <a
                key={index}
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                onClick={(e) => {
                  e.preventDefault();
                  setFilterCat(cat);
                  closeDropdownPopover();
                }}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
