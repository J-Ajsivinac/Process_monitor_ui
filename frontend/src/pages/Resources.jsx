import Content from "../components/Content";
import { Title } from "../components/Title";
import { TbNetwork } from "react-icons/tb";
import { TitleContainer } from "../components/TitleContainer";
import { FaLaptopCode } from "react-icons/fa";
import { AreaChartComp } from "../components/charts/AreaChart";
import { FaMemory } from "react-icons/fa";
import { RiCpuLine } from "react-icons/ri";

function Resources() {

    const data = [];
    const totalDataPoints = 30; // Cantidad de puntos de datos
    const intervalSeconds = 10; // Intervalo en segundos
    for (let i = 0; i <= totalDataPoints; i++) {
        // Calculamos la fecha restando los segundos acumulados
        const date = new Date(Date.now() - (totalDataPoints - i) * intervalSeconds * 1000);
        
        // Formateamos la hora con minutos y segundos
        const timeString = date.toISOString().substr(11, 8);
        
        data.push({
            time: timeString,
            value: 1 + Math.random() // Simula el uso de CPU (1-2)
        });
    }

    const colorsCPU = ["#838dc2","#333d53","#333d53"]
    const colorsRAM = ["#4e8f7b","#2d4a48","#2d4a48"]
    return (
        <Content>
            <Title icon={<FaLaptopCode size={26} />} title={"Recursos"} />
            {/* Bytes enviados y recibidos a lo largo del tiempo */}
            <div className="w-full h-full pl-6 pr-6 pb-4">
                <div className="flex flex-col h-[97%] w-full gap-4">
                    <div className="flex h-1/2 flex-col w-full border-1 border-border-second-dark rounded-sm pt-3 pl-3 pb-2">
                        <div className="flex items-center justify-between pr-3 mb-4">
                            <TitleContainer
                                icon={<RiCpuLine size={24} />}
                                title={"Uso de CPU"}
                            />
                            <span className="text-3xl font-semibold">32%</span>
                        </div>
                        <AreaChartComp data={data} colors={colorsCPU} id={1} />
                    </div>
                    <div className="flex h-1/2 flex-col w-full border-1 border-border-second-dark rounded-sm p-3">
                        <div className="flex items-center justify-between pr-3 mb-4">
                            <TitleContainer
                                icon={<FaMemory size={24} />}
                                title={"Uso de RAM"}
                            />
                            <span className="text-3xl font-semibold">32%</span>
                        </div>
                        <AreaChartComp data={data} colors={colorsRAM} id={2} />
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Resources;
