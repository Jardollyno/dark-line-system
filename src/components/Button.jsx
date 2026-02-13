function Button(props) {
  return (
    <button
      className="mt-2 bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition min-w-[10rem] px-4 py-2 rounded-md font-medium"
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
