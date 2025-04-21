import { useState, useEffect, useRef } from "react";

export default function ProcessTimeline() {
    const timelineRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
    
    // Datos de ejemplo de procesos (simula los datos de tu sistema)
   // Datos de ejemplo de procesos (simula los datos de tu sistema)
    const [processes, setProcesses] = useState([
    {
        id: 1,
        name: "Apache Server",
        startTime: "12:22:52",
        endTime: "12:26:14",
    },
    {
        id: 2,
        name: "MySQL Database",
        startTime: "07:27:52",
        endTime: null, // Proceso aún en ejecución
    },
    {
        id: 3,
        name: "Backup Script",
        startTime: "12:27:52",
        endTime: "13:01:52",
    },
    {
        id: 4,
        name: "Log Analyzer",
        startTime: "11:42:52",
        endTime: "12:12:52",
    },
    {
        id: 5,
        name: "System Monitor",
        startTime: "12:27:52",
        endTime: null, // Proceso aún en ejecución
    }
]);

    // Función para formatear tiempo actual a formato HH:MM:SS
    const formatCurrentTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    // Convertir tiempo en formato "HH:MM:SS" a minutos totales para cálculos
    const timeToMinutes = (timeString) => {
        if (!timeString) return 0;
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return hours * 60 + minutes + seconds / 60;
    };

    // Para simular el avance del tiempo más rápido (1 minuto cada 3 segundos)
    useEffect(() => {
        const timeSpeed = 20; // Factor de aceleración (20x más rápido)
        
        const timeInterval = setInterval(() => {
            const now = new Date();
            // Calculamos cuánto tiempo ha pasado desde la última actualización
            const elapsedMs = now.getTime() - lastUpdateTime.getTime();
            // Aplicamos el factor de aceleración
            const acceleratedMs = elapsedMs * timeSpeed;
            
            // Creamos una nueva fecha acelerada
            const acceleratedTime = new Date(currentTime.getTime() + acceleratedMs);
            
            setCurrentTime(acceleratedTime);
            setLastUpdateTime(now);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [currentTime, lastUpdateTime]);

    // Simulación de actualización de procesos en tiempo real
    useEffect(() => {
        // Simulación de actualización de procesos
        const processInterval = setInterval(() => {
            setProcesses(prevProcesses => {
                // Copia del array de procesos
                const updatedProcesses = [...prevProcesses];
                
                // Simular finalización de un proceso aleatorio que esté en ejecución
                const runningProcesses = updatedProcesses.filter(p => p.endTime === null);
                if (runningProcesses.length > 0 && Math.random() > 0.8) {
                    const randomIndex = Math.floor(Math.random() * runningProcesses.length);
                    const processToUpdate = runningProcesses[randomIndex];
                    const realIndex = updatedProcesses.findIndex(p => p.id === processToUpdate.id);
                    
                    if (realIndex !== -1) {
                        updatedProcesses[realIndex] = {
                            ...updatedProcesses[realIndex],
                            endTime: formatCurrentTime(currentTime)
                        };
                    }
                }
                
                // Simular inicio de un nuevo proceso
                if (Math.random() > 0.7) {
                    const newId = Math.max(...updatedProcesses.map(p => p.id)) + 1;
                    const processTypes = ["Backup Script", "Log Analyzer", "Data Processor", "File Scanner", "API Monitor"];
                    const randomType = processTypes[Math.floor(Math.random() * processTypes.length)];
                    
                    updatedProcesses.push({
                        id: newId,
                        name: randomType,
                        startTime: formatCurrentTime(currentTime),
                        endTime: null
                    });
                }
                
                return updatedProcesses;
            });
        }, 6000); // Cada 6 segundos

        // Auto-scroll para mantener visibles los procesos recientes
        const scrollToRight = () => {
            if (timelineRef.current) {
                // Scroll suave hacia la derecha
                timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
            }
        };
        
        const scrollInterval = setInterval(scrollToRight, 5000);

        return () => {
            clearInterval(processInterval);
            clearInterval(scrollInterval);
        };
    }, [currentTime]);

    // Encontrar los límites de tiempo para la escala del gráfico
    const calculateTimeRange = () => {
        if (processes.length === 0) return { minTime: 0, maxTime: 60, timeRange: 60 };
        
        const minTime = Math.min(...processes.map(p => timeToMinutes(p.startTime)));
        
        // Para el tiempo máximo, usamos el tiempo actual para procesos en ejecución
        const currentTimeStr = formatCurrentTime(currentTime);
        const maxTime = Math.max(
            ...processes.map(p => p.endTime ? timeToMinutes(p.endTime) : timeToMinutes(currentTimeStr)),
            timeToMinutes(currentTimeStr) // Siempre incluir el tiempo actual
        );
        
        // Añadir margen al final
        return { 
            minTime, 
            maxTime: maxTime + 5, 
            timeRange: (maxTime + 5) - minTime 
        };
    };

    const { minTime, maxTime, timeRange } = calculateTimeRange();

    // Crear marcas de tiempo para el eje X
    const generateTimeMarks = () => {
        const startHour = Math.floor(minTime / 60);
        const endHour = Math.ceil(maxTime / 60);
        const marks = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 20) {
                if (hour === endHour && minute > (maxTime % 60)) continue;

                const totalMinutes = hour * 60 + minute;
                if (totalMinutes >= minTime && totalMinutes <= maxTime) {
                    const position = ((totalMinutes - minTime) / timeRange) * 100;
                    marks.push({
                        time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
                        position: position,
                    });
                }
            }
        }
        return marks;
    };

    const timeMarks = generateTimeMarks();
    
    // Calcular posición del tiempo actual
    const currentTimeMinutes = timeToMinutes(formatCurrentTime(currentTime));
    const currentTimePosition = ((currentTimeMinutes - minTime) / timeRange) * 100;

    // Contador de procesos activos
    const activeProcesses = processes.filter(p => p.endTime === null).length;

    return (
        <div className="w-full py-2 px-4 rounded-lg h-[95%] ">
            {/* Panel de información */}
            <div className="flex justify-between mb-2 text-xs text-gray-500">
                <div>Tiempo actual: {formatCurrentTime(currentTime)}</div>
                <div>Procesos activos: {activeProcesses}</div>
            </div>
            
            {/* Contenedor principal con scroll horizontal */}
            <div 
                ref={timelineRef}
                className="overflow-x-auto h-[96%]"
                style={{ minWidth: "100%" }}
            >
                <div className="relative min-w-full h-full" style={{ minWidth: "max(800px, 100%)" }}>
                    {/* Eje de tiempo */}
                    <div className="relative h-5 mb-3">
                        {timeMarks.map((mark, index) => (
                            <div
                                key={index}
                                className="absolute top-0 flex flex-col items-center"
                                style={{ left: `${mark.position}%` }}
                            >
                                <div className="h-2 w-px bg-gray-400"></div>
                                <span className="text-xs text-gray-400 mt-1">
                                    {mark.time}
                                </span>
                            </div>
                        ))}
                        
                        {/* Línea de tiempo actual */}
                        <div 
                            className="absolute top-0 h-3 w-px bg-red-500"
                            style={{ left: `${currentTimePosition}%` }}
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 -mt-1"></div>
                        </div>
                    </div>

                    {/* Barras de procesos */}
                    <div className="space-y-5 overflow-y-auto px-3 py-2 h-full ">
                        {processes.map((process) => {
                            const startMinutes = timeToMinutes(process.startTime);
                            // Para procesos en ejecución, usamos tiempo actual
                            const endMinutes = process.endTime 
                                ? timeToMinutes(process.endTime) 
                                : currentTimeMinutes;

                            const startPosition = ((startMinutes - minTime) / timeRange) * 100;
                            const endPosition = ((endMinutes - minTime) / timeRange) * 100;
                            const width = endPosition - startPosition;

                            // Mantener los colores originales
                            const processColor = process.endTime
                                ? "bg-[#333d53] border-2 border-[#838dc2]"
                                : "bg-[#2d4a48] border-2 border-[#4e8f7b]";

                            // Animación para procesos en ejecución
                            const animationClass = process.endTime === null ? "transition-all duration-1000" : "";

                            return (
                                <div key={process.id} className="relative h-9">
                                    {/* Línea horizontal */}
                                    <div className="absolute w-full border-1 border-gray-400 border-dashed top-3.5"></div>

                                    {/* Barra del proceso */}
                                    <div
                                        className={`absolute h-8 ${processColor} rounded-sm flex items-center px-2 shadow-sm border ${animationClass}`}
                                        style={{
                                            left: `${startPosition}%`,
                                            width: `${Math.max(width, 2)}%`,
                                            minWidth: "60px",
                                        }}
                                    >
                                        <span className="text-sm font-medium truncate text-white">
                                            {process.name}
                                            {process.endTime === null && " (En ejecución)"}
                                        </span>
                                    </div>

                                    {/* Tiempo de inicio */}
                                    <span
                                        className="absolute text-xs text-gray-500"
                                        style={{
                                            left: `${startPosition-1}%`,
                                            top: "90%",
                                        }}
                                    >
                                        {process.startTime}
                                    </span>

                                    {/* Tiempo de fin (si existe) */}
                                    {process.endTime && (
                                        <span
                                            className="absolute text-xs text-gray-500"
                                            style={{
                                                left: `${endPosition-3.5}%`,
                                                top: "90%",
                                            }}
                                        >
                                            {process.endTime}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}