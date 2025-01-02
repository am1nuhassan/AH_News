const CategoriesButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`font-semibold py-2 px-4 text-slate-900 hover:text-slate-700 ${
        isActive ? 'border-b-2 border-slate-900' : ''
      } focus:outline-none`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CategoriesButton;
