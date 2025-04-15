
import { IoSearch } from "react-icons/io5";

const InputField = ({
    name,
}) => {

    return (
        <div>
            <div className="relative">
                <input
                    id={name}
                    // {...register(name, {
                    //     required: "La contraseña es requerida",
                    // })}
                    type="text"
                    className="w-full pl-4 pr-12 py-2 border-1 border-border-dark focus:outline-1 focus:outline-white/30 rounded-sm"
                    placeholder="Buscar Proceso"
                />
                <IoSearch className="absolute right-3 top-3 text-text-second-dark hover:text-gray-300"/>
            </div>
        </div>
    );
};

export default InputField;
