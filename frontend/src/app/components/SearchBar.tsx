import { SetStateAction, Dispatch } from "react";

interface SerachProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

const SearchBar = () => {
  return (
    <>
      <div className="flex flex-nowrap items-center bg-white overflow-hidden px-2 py-1 justify-between mx-auto shadow-gray-200 shadow-lg rounded-lg h-min">
        <input
          className="text-base text-gray-500 flex-grow outline-none px-2 w-72 "
          type="text"
          placeholder="Search your domain name"
        />
        <div className="flex flex-nowrap items-center px-2 rounded-lg space-x-4 mx-auto ">
          <select
            title="list"
            defaultValue="com"
            id="Com"
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
          >
            <option value="com">com</option>
            <option value="net">net</option>
            <option value="org">org</option>
            <option value="io">io</option>
          </select>
          <button className="bg-indigo-600 text-white text-sm rounded-lg px-4 py-2">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
