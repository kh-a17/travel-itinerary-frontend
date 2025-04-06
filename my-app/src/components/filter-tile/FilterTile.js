import './FilterTile.css';

const FilterTile = ({ filter, filterSelected, className }) => {

    return (
        <button onClick={filterSelected} className={`${className} filter-tile-wrapper`}>
            {filter}
        </button>
    );
}

export default FilterTile;
