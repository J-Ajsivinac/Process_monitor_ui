import { useState, useEffect } from "react";

export default function ProcessTimeline() {
    // Datos de ejemplo de procesos (simula los datos de tu sistema)
    const [processes, setProcesses] = useState([
        {
            id: 1,
            name: "Apache Server",
            startTime: "12:22:52",
            endTime: "18:45:14",
        },
        {
            id: 2,
            name: "MySQL Database",
            startTime: "15:27:52",
            endTime: null, // Proceso aún en ejecución
        },
        {
            id: 3,
            name: "Backup Script",
            startTime: "16:27:52",
            endTime: "17:57:52",
        },
        {
            id: 4,
            name: "Log Analyzer",
            startTime: "17:42:52",
            endTime: "18:12:52",
        },
        {
            id: 5,
            name: "System Monitor",
            startTime: "12:27:52",
            endTime: null, // Proceso aún en ejecución
        },
        {
            id: 6,
            name: "System Monitor",
            startTime: "12:27:52",
            endTime: null, // Proceso aún en ejecución
        },
        {
            id: 7,
            name: "Backup Script",
            startTime: "16:27:52",
            endTime: "17:57:52",
        },
        {
            id: 8,
            name: "Backup Script",
            startTime: "16:27:52",
            endTime: "17:57:52",
        },
        {
            id: 9,
            name: "Backup Script",
            startTime: "16:27:52",
            endTime: "17:57:52",
        },
    ]);

    // Convertir tiempo en formato "HH:MM:SS" a minutos totales para cálculos
    const timeToMinutes = (timeString) => {
        if (!timeString) return 0;
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return hours * 60 + minutes + seconds / 60;
    };

    // Encontrar los límites de tiempo para la escala del gráfico
    const minTime = Math.min(
        ...processes.map((p) => timeToMinutes(p.startTime))
    );
    const maxTime = Math.max(
        ...processes.map((p) =>
            p.endTime ? timeToMinutes(p.endTime) : timeToMinutes("18:45:14")
        )
    );
    const timeRange = maxTime - minTime;

    // Crear marcas de tiempo para el eje X
    const generateTimeMarks = () => {
        const startHour = Math.floor(minTime / 60);
        const endHour = Math.ceil(maxTime / 60);
        const marks = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === endHour && minute > 0) continue;

                const totalMinutes = hour * 60 + minute;
                if (totalMinutes >= minTime && totalMinutes <= maxTime) {
                    const position =
                        ((totalMinutes - minTime) / timeRange) * 100;
                    marks.push({
                        time: `${hour.toString().padStart(2, "0")}:${minute
                            .toString()
                            .padStart(2, "0")}`,
                        position: position,
                    });
                }
            }
        }
        return marks;
    };

    const timeMarks = generateTimeMarks();

    return (
        <div className="w-full py-2 px-4 rounded-lg h-full">
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
            </div>

            {/* Barras de procesos */}
            <div className="space-y-5 h-11/12 overflow-y-auto px-3 py-2">
                {processes.map((process) => {
                    const startMinutes = timeToMinutes(process.startTime);
                    const endMinutes = process.endTime
                        ? timeToMinutes(process.endTime)
                        : maxTime;

                    const startPosition =
                        ((startMinutes - minTime) / timeRange) * 100;
                    const endPosition =
                        ((endMinutes - minTime) / timeRange) * 100;
                    const width = endPosition - startPosition;

                    // Determinar color según si el proceso está completado o en ejecución
                    const processColor = process.endTime
                        ? "bg-[#333d53] border-2 border-[#838dc2]"
                        : "bg-[#2d4a48] border-2 border-[#4e8f7b]";

                    return (
                        <div key={process.id} className="relative h-9">
                            {/* Línea horizontal */}
                            <div className="absolute w-full border-1 border-border-second-dark border-dashed top-3.5"></div>

                            {/* Barra del proceso */}
                            <div
                                className={`absolute h-8 ${processColor} rounded-sm flex items-center px-2 shadow-sm border`}
                                style={{
                                    left: `${startPosition}%`,
                                    width: `${width}%`,
                                    minWidth: "60px",
                                }}
                            >
                                <span className="text-sm font-medium truncate">
                                    {process.name}
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
    );
}
