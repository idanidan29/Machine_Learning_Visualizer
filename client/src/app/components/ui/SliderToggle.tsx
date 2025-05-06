import { motion } from "framer-motion";
import { MdOutlinePassword } from "react-icons/md";
import { LuImageUp } from "react-icons/lu";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

interface SliderToggleProps {
  selected: "Log In" | "Register";
  setSelected: (value: "Log In" | "Register") => void;
}

export const SliderToggle: React.FC<SliderToggleProps> = ({ selected, setSelected }) => {
  return (
    <div id="Encoder" className="flex justify-center w-full">
      <div className="relative flex w-fit items-center rounded-full">
        <button
          className={`${TOGGLE_CLASSES} ${selected === "Log In" ? "text-white" : "text-slate-300"}`}
          onClick={() => {
            setSelected("Log In");
          }}
        >
          <LuImageUp className="relative z-10 text-lg md:text-sm" />
          <span className="relative z-10">Log In</span>
        </button>
        <button
          className={`${TOGGLE_CLASSES} ${selected === "Register" ? "text-white" : "text-slate-800"}`}
          onClick={() => {
            setSelected("Register");
          }}
        >
          <MdOutlinePassword className="relative z-10 text-lg md:text-sm" />
          <span className="relative z-10">Register</span>
        </button>
        <div
          className={`absolute inset-0 z-0 flex ${selected === "Register" ? "justify-end" : "justify-start"}`}
        >
          <motion.span
            layout
            transition={{ type: "spring", damping: 15, stiffness: 250 }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};
