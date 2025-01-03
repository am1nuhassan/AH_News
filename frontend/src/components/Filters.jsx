const Filters = ({
  category,
  setCategory,
  source,
  setSource,
  date,
  setDate,
  categories,
  sources,
  resetFilters,
}) => (
  <div className='flex flex-wrap justify-center gap-4'>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className='border border-slate-900 rounded-md p-2'
    >
      <option value=''>All Categories</option>
      {categories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>
    <select
      value={source}
      onChange={(e) => setSource(e.target.value)}
      className='border border-slate-900 rounded-md p-2'
    >
      <option value=''>All Sources</option>
      {sources.map((src) => (
        <option
          key={src}
          value={src}
        >
          {src}
        </option>
      ))}
    </select>
    <input
      type='date'
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className='border border-slate-900 rounded-md p-2'
    />
    <button
      type='button'
      onClick={resetFilters}
      className='py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-gray-600'
    >
      Reset Filters
    </button>
  </div>
);

export default Filters;
