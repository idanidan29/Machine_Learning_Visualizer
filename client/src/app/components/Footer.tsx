import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Copyright Text */}
        <p className="text-xs text-gray-600">
          © 2024 Idan Levi
        </p>

        {/* Social Icons */}
        <div className="flex space-x-3">
          {/* GitHub */}
          <a 
            href="https://github.com/idanidan29/steganography" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-8 h-8 flex justify-center items-center 
                          rounded-full
                          transition-all duration-300 hover:scale-110">
              <FaGithub className="text-gray-500 text-lg group-hover:text-purple-400" />
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/idan-levi-7a8506242/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-8 h-8 flex justify-center items-center 
                          rounded-full
                          transition-all duration-300 hover:scale-110">
              <CiLinkedin className="text-gray-500 text-lg group-hover:text-purple-400" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;