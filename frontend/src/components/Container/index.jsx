const Container = ({ className, children }) => {
  return (
    <main
      className={`w-[90%] shadow-lg max-w-[720px] bg-white rounded-lg p-4 border ${className}`}
    >
      {children}
    </main>
  );
};

export default Container;
