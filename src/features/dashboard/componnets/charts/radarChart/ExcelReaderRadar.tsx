import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import BusRadarChart from "./BusRadarChart";

interface DataRow {
  Station: string;
  Time: number;
  Value: number;
}

const ExcelReaderRadar: React.FC = () => {
  const [selectedStation, setSelectedStation] =
    useState<string>("Central Area");
  const [stationList, setStationList] = useState<string[]>([]);

  const [busData, setBusData] = useState<DataRow[]>([]);
  const [waitTimeData, setWaitTimeData] = useState<DataRow[]>([]);
  const [entryFlowData, setEntryFlowData] = useState<DataRow[]>([]);
  const [exitFlowData, setExitFlowData] = useState<DataRow[]>([]);

  const predefinedStations = [
    "North Axis Start Station",
    "North Axis End Station",
    "NW Axis Internal Station",
    "Central Area",
    "West Axis Start Station",
    "SW Axis Start Station 1",
    "SW Axis Start Station 2",
    "SW Axis Start Station 3",
    "Train Station",
    "Airport",
    "Quba Parking",
  ];

  useEffect(() => {
    const fetchAndParseExcel = async () => {
      const response = await fetch("/data/RadarChartData.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const extractSheetData = (sheetName: string): DataRow[] => {
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        const rows = json.slice(1);
        return rows.map((row) => ({
          Station: row[0],
          Time: Number(row[1]),
          Value: Number(row[2]),
        }));
      };

      const bus = extractSheetData("Bus Count");
      const wait = extractSheetData("Waiting Time");
      const entry = extractSheetData("Entry Flow Rate");
      const exit = extractSheetData("Exit Flow Rate");

      // Only include stations from the predefined list and that exist in the data
      const filteredStations = predefinedStations.filter((station) =>
        bus.some((row) => row.Station === station)
      );

      setBusData(bus);
      setWaitTimeData(wait);
      setEntryFlowData(entry);
      setExitFlowData(exit);
      setStationList(filteredStations);

      if (!filteredStations.includes(selectedStation)) {
        setSelectedStation(filteredStations[0]); // fallback if current isn't in the list
      }
    };

    fetchAndParseExcel();
  }, []);

  const filterData = (rows: DataRow[]) =>
    rows.filter((row) => row.Station === selectedStation);

  return (
    <div className="flex flex-col justify-start w-full h-full p-4 overflow-hidden">
      <div className="flex items-end justify-center gap-5 align-middle">
        {" "}
        <h2 className="my-8 text-2xl font-semibold text-center text-white">
          {selectedStation}
        </h2>
        {/* Dropdown to switch stations */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="px-4 py-2 text-white bg-gray-700 rounded-md"
          >
            {stationList.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-6 px-10 py-4 m-3 mx-auto">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">
            Bus Count
          </h2>
          <BusRadarChart
            stationName={selectedStation}
            data={{ "Bus Count": filterData(busData) }}
            colorMap={{ "Bus Count": "green" }}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">
            Waiting Time
          </h2>
          <BusRadarChart
            stationName={selectedStation}
            data={{ "wait time": filterData(waitTimeData) }}
            colorMap={{ "wait time": "darkorange" }}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">
            Entry & Exit Flow
          </h2>
          <BusRadarChart
            stationName={selectedStation}
            data={{
              "Entry Flow Rate": filterData(entryFlowData),
              "Exit Flow Rate": filterData(exitFlowData),
            }}
            colorMap={{
              "Entry Flow Rate": "goldenrod",
              "Exit Flow Rate": "darkorange",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExcelReaderRadar;
