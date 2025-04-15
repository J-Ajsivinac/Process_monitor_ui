import Content from "../components/Content";
import InputField from "../components/InputField";
import TabComponent from "../components/TabComponent";
import TabContent from "../components/TabContent";
import { Title } from "../components/Title";
import { MdDeleteOutline } from "react-icons/md";
import { TitleContainer } from "../components/TitleContainer";
import { RiCpuLine } from "react-icons/ri";
import { MdTimeline } from "react-icons/md";
import ProcessTimeline from "../components/charts/TimeLineChart";
import { SelectInput } from "../components/SelectInput";
import { LuAppWindow } from "react-icons/lu";
import { useState } from "react";
import AreaDouble from "../components/charts/AreaDouble";
import ProgressBar from "../components/ProgressBar";
import { toast } from 'sonner';
import { FiCheck } from "react-icons/fi";

function Index() {
    const [selectedProcess, setSelectedProcess] = useState("");
    const [selectedPids, setSelectedPids] = useState([]);
    
    // Datos de ejemplo para la tabla
    const processData = [
        { icon: <LuAppWindow />, nombre: "Chrome", pid: 12, usuario: "user1", estado: "Running", cpu: 55, ram: 85, red: "12.3kbps", inicio: "12:03:12" },
        { icon: <LuAppWindow />, nombre: "Brave", pid: 33, usuario: "user2", estado: "Sleeping", cpu: 30, ram: 45, red: "5.1kbps", inicio: "10:15:33" },
        { icon: <LuAppWindow />, nombre: "Docker", pid: 334, usuario: "root", estado: "Running", cpu: 75, ram: 60, red: "8.7kbps", inicio: "08:45:21" },
        { icon: <LuAppWindow />, nombre: "Node", pid: 456, usuario: "user1", estado: "Running", cpu: 40, ram: 35, red: "3.2kbps", inicio: "09:12:47" },
        { icon: <LuAppWindow />, nombre: "VSCode", pid: 789, usuario: "user3", estado: "Running", cpu: 65, ram: 70, red: "15.8kbps", inicio: "11:22:09" },
    ];

    const process = [
        { icon: <LuAppWindow />, nombre: "Chrome", pid: 12 },
        { icon: <LuAppWindow />, nombre: "Brave", pid: 33 },
        { icon: <LuAppWindow />, nombre: "Docker", pid: 334 },
        { icon: <LuAppWindow />, nombre: "Docker", pid: 334 },
        { icon: <LuAppWindow />, nombre: "Docker", pid: 334 },
    ];

    const handleSelectProcess = (value) => {
        if (value) {
            setSelectedProcess(value);
        }
    };

    const handleCheckboxChange = (pid) => {
        setSelectedPids(prev => {
            if (prev.includes(pid)) {
                return prev.filter(id => id !== pid);
            } else {
                return [...prev, pid];
            }
        });
    };

    const handleKillProcesses = () => {
        if (selectedPids.length === 0) return;
        
        toast.success(`Procesos eliminados: ${selectedPids.join(', ')}`);
        // Aquí iría la lógica para matar los procesos
        setSelectedPids([]); // Limpiar selección después de matar procesos
    };

    return (
        <Content>
            <Title icon={<RiCpuLine size={26} />} title={"Procesos"} />
            <TabComponent>
                {/*============================
                    TAB: Procesos
                =============================*/}
                <TabContent label="Resumen">
                    <div className="flex px-6 py-1 flex-col gap-4 h-full">
                        <form action="" className="flex justify-between w-full">
                            <div className="w-1/3">
                                <InputField name="search" />
                            </div>
                            <button 
                                type="button"
                                onClick={handleKillProcesses}
                                disabled={selectedPids.length === 0}
                                className={`flex items-center gap-1.5 px-3 rounded-sm cursor-pointer transition-all duration-200 ${
                                    selectedPids.length > 0 
                                        ? 'bg-background-error/60 hover:bg-background-error/80' 
                                        : 'bg-background-error/30 cursor-not-allowed'
                                }`}
                            >
                                <MdDeleteOutline size={18} /> Matar Procesos
                            </button>
                        </form>
                        <div className="flex flex-grow h-full w-full gap-2">
                            <div className="w-full border-1 border-border-second-dark rounded-sm">
                                <table className="table w-full text-gray-400 text-sm border-collapse">
                                    <thead className="bg-[#151b1e] text-[#b2b8bb]">
                                        <tr className="">
                                            <th className="pl-3 py-3 pr-0 text-left font-semibold">
                                                
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                PID
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                NOMBRE DEL PROCESO
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                USUARIO
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                ESTADO
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                CPU %
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                RAM %
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                RED
                                            </th>
                                            <th className="p-3 text-left font-semibold">
                                                INICIO
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {processData.map((proc) => (
                                            <tr key={proc.pid} className="bg-transparent border-b-1 border-border-dark text-text-dark hover:bg-gray-900/20">
                                                <td className="px-3 py-2 text-left">
                                                    <div className="flex">
                                                        <input 
                                                            type="checkbox" 
                                                            id={`checkbox-${proc.pid}`}
                                                            checked={selectedPids.includes(proc.pid)}
                                                            onChange={() => handleCheckboxChange(proc.pid)}
                                                            className="peer hidden"
                                                        />
                                                        <label 
                                                            htmlFor={`checkbox-${proc.pid}`}
                                                            className="select-none cursor-pointer rounded border-2 border-gray-400/60
                                                            w-5 h-5 flex items-center justify-center transition-colors duration-200 ease-in-out 
                                                            peer-checked:bg-blue-500/40 peer-checked:border-blue-500"
                                                        >
                                                            <FiCheck 
                                                                className={`text-white transition-opacity duration-200 ease-in-out ${selectedPids.includes(proc.pid) ? 'opacity-100' : 'opacity-0'}`} 
                                                                size={14}
                                                            />
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    {proc.pid}
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    <div className="flex items-center gap-2">
                                                        {proc.icon} {proc.nombre}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    {proc.usuario}
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        proc.estado === "Running" ? "bg-green-500/20 text-green-400" :
                                                        proc.estado === "Sleeping" ? "bg-yellow-500/20 text-yellow-400" :
                                                        "bg-red-500/20 text-red-400"
                                                    }`}>
                                                        {proc.estado}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    <ProgressBar value={proc.cpu} color="blue"/>
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    <ProgressBar value={proc.ram} color="green"/>
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    {proc.red}
                                                </td>
                                                <td className="px-3 py-4 text-left">
                                                    {proc.inicio}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </TabContent>

                {/*============================
                    TAB: Detalle
                =============================*/}
                <TabContent label="Detalle">
                    <div className="flex flex-col h-full w-full px-6 py-1 gap-4">
                        <div className="flex flex-col w-full">
                            <SelectInput
                                options={process}
                                placeHolder="Elija el Proceso"
                                onSelectOption={handleSelectProcess}
                                value={selectedProcess}
                                haveBackground={true}
                                icon={RiCpuLine}
                            />
                        </div>
                        <div className="flex h-full gap-4 border-1 border-border-second-dark rounded-sm">
                            <AreaDouble
                                id="cpu-ram-usage"
                                data={[
                                    {
                                        time: "2023-01-01T10:00:00",
                                        value1: 30,
                                        value2: 45,
                                    },
                                    {
                                        time: "2023-01-01T10:05:00",
                                        value1: 45,
                                        value2: 60,
                                    },
                                    {
                                        time: "2023-01-01T10:10:00",
                                        value1: 75,
                                        value2: 30,
                                    },
                                    {
                                        time: "2023-01-01T10:15:00",
                                        value1: 35,
                                        value2: 83,
                                    },
                                ]}
                                colors={[
                                    ["#838dc2","#333d53","#333d53"], // Colores para CPU
                                    ["#4e8f7b","#2d4a48","#2d4a48"], // Colores para RAM
                                ]}
                            />
                        </div>
                    </div>
                </TabContent>

                {/*============================
                    TAB: Líne del tiempo
                =============================*/}
                <TabContent label="Línea del Tiempo">
                    <div className="flex px-6 flex-col py-1 gap-4 h-full">
                        <div className="h-[98%] w-full border-1 border-border-second-dark rounded-sm p-3">
                            <TitleContainer
                                icon={<MdTimeline size={24} />}
                                title={"Línea de Tiempo de Procesos"}
                            />
                            <ProcessTimeline />
                        </div>
                    </div>
                </TabContent>
            </TabComponent>
        </Content>
    );
}

export default Index;
