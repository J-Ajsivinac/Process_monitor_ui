import Content from "../components/Content";
import { Title } from "../components/Title";
import { TbNetwork } from "react-icons/tb";

function Network() {
    return (
        <Content>
            <Title icon={<TbNetwork size={26} />} title={"Red"} />
            <span className="pl-7 mb-3">Tráfico de Red</span>
            {/* Bytes enviados y recibidos a lo largo del tiempo */}
            <div className="w-full h-full pl-6 pr-6 pb-4">
                <div className="w-full h-full border-1 border-border-dark rounded-sm">

                </div>
            </div>
        </Content>
    );
}

export default Network;
