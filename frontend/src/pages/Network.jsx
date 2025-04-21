import Content from "../components/Content";
import { Title } from "../components/Title";
import { TbNetwork } from "react-icons/tb";
import { AreaChartComp } from "../components/charts/AreaChart";

function Network() {
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

    const colors = ["#838dc2","#333d53","#333d53"]
    return (
        <Content>
            <Title icon={<TbNetwork size={26} />} title={"Red"} />
            <span className="pl-7 mb-3">Tráfico de Red</span>
            {/* Bytes enviados y recibidos a lo largo del tiempo */}
            <div className="w-full h-full pl-6 pr-6 pb-4">
                <div className="w-full h-full border-1 border-border-dark rounded-sm">
                    <AreaChartComp data={data} colors={colors} id={1} />
                </div>
            </div>
        </Content>
    );
}

export default Network;
