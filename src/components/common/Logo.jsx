import logo from "../../assets/logo.jpg";
const Logo = ({ size = 40, withText = true, dark = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      < img
        src={logo}
        alt="Janoshi Logo"
        className="w-10 h-8 object-cover rounded-md"
        alt="Janoshi Logo" 
      />
      {withText && (
        <div className="leading-tight">
          <p className={`font-display font-semibold text-[17px] tracking-wide ${dark ? "text-white" : "text-[#0B1F4D]"}`}>
            Janoshi
          </p>
          <p className={`text-[10px] tracking-[0.2em] uppercase ${dark ? "text-[#E4C766]" : "text-[#C9A227]"}`}>
            Okara
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
