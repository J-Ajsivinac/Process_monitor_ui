import Content from "../components/Content";
import { Title } from "../components/Title";
import { SlEnergy } from "react-icons/sl";

function Energy() {
    return (
        <Content>
            <Title icon={<SlEnergy size={26} />} title={"Energía"} />
            <span className="pl-7 mb-3">Consumo de energía por proceso</span>
            <div className="w-full h-full pl-6 pr-6 pb-4">
                <div className="w-full h-full border-1 border-border-dark rounded-sm">
                    
                </div>
            </div>
        </Content>
    );
}

export default Energy;
