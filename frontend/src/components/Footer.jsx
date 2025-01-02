const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='text-center mt-12 border-t py-12'>
      &copy; Copyright {year}
    </div>
  );
};

export default Footer;
