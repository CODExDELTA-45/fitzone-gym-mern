const Footer = () => (
  <footer className="bg-dark text-gray-400 text-center py-8 border-t border-border">
    <p className="font-semibold text-white">
      FIT<span className="text-primary">ZONE</span>
    </p>
    <p className="text-sm mt-2">© {new Date().getFullYear()} FitZone Gym. All rights reserved.</p>
    <p className="text-xs text-gray-600 mt-1">Built with the MERN Stack</p>
  </footer>
);

export default Footer;
