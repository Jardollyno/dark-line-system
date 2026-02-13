function Title(props) {
  return (
    <h1 className="mb-2 text-3xl text-slate-100 font-bold text-center">
      {props.children}
    </h1>
  );
}

export default Title;
