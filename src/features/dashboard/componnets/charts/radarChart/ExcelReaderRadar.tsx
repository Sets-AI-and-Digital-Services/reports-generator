import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import BusRadarChart from "./BusRadarChart";
import light_bulb from "../../../../../../public/assets/light_bulb.svg";

interface DataRow {
  Station: string;
  Time: number;
  Value: number;
}

const INSIGHTS_DATA: {
  [stationName: string]: {
    Description?: string;
    "Bus Count"?: number;
    "Waiting Time"?: number;
    "Entry Flow Rate"?: number;
    "Exit Flow Rate"?: number;
  };
} = {
  "Central Area": {
    Description:
      "This indicates an increase in both waiting time and bus volume between 12:00 and 2:00 PM, likely due to overlap with hotel check-in and check-out times.",
    "Bus Count": 49684,
    "Waiting Time": 19,
    "Entry Flow Rate": 69,
    "Exit Flow Rate": 72,
  },
  "Quba Parking": {
    Description:
      "This reflects pilgrims’ desire to follow the Sunnah of Prophet Muhammad (peace be upon him) by visiting and praying at Quba Mosque, in accordance with his practice of praying there on Saturdays.",
    "Bus Count": 19383,
    "Waiting Time": 15,
    "Entry Flow Rate": 20,
    "Exit Flow Rate": 27,
  },
  "SW Axis Start Station 3": {
    "Bus Count": 12171,
    "Waiting Time": 18,
    "Entry Flow Rate": 18,
    "Exit Flow Rate": 17,
  },
  "SW Axis Start Station 1": {
    "Bus Count": 5233,
    "Waiting Time": 27,
    "Entry Flow Rate": 9,
    "Exit Flow Rate": 8,
  },
  "North Axis Start Station": {
    "Bus Count": 26249,
    "Waiting Time": 17,
    "Entry Flow Rate": 39,
    "Exit Flow Rate": 39,
  },
};

const ExcelReaderRadar: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string>("Central Area");
  const insights = INSIGHTS_DATA[selectedStation] || null;
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
      const filteredStations = predefinedStations.filter((station) => bus.some((row) => row.Station === station));

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

  const filterData = (rows: DataRow[]) => rows.filter((row) => row.Station === selectedStation);

  return (
    <div className="flex flex-col justify-start w-full h-full p-4 overflow-hidden">
      {insights && (
        <div className="absolute flex flex-col z-10 text-left overflow-y-auto text-sm top-4 right-8 w-80 h-32 rounded-[11.76px] p-4 gap-2 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
          <h2 className="text-lg font-semibold">Insights</h2>
          {insights?.["Description"] && <div className="flex items-start gap-2">
            <img src={light_bulb} className="" />
            <span>{insights["Description"]}</span>
          </div>}
          <div className="flex items-start gap-2">
            <img src={light_bulb} className="" />
            <span>Bus Count: {insights["Bus Count"]}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={light_bulb} className="" />
            <span>Waiting Time: {insights["Waiting Time"]}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={light_bulb} className="" />
            <span>Entry Flow Rate: {insights["Entry Flow Rate"]}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={light_bulb} className="" />
            <span>Exit Flow Rate: {insights["Exit Flow Rate"]}</span>
          </div>
        </div>
      )}

      <div className="flex items-end gap-5 align-middle">
        {/* Dropdown to switch stations */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="px-4 py-2 text-white text-center bg-gray-700 rounded-md"
          >
            {stationList.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-6 px-10 pt-4 m-3 mt-20 mb-0 mx-auto">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">Bus Count</h2>
          <BusRadarChart stationName={selectedStation} data={{ "Bus Count": filterData(busData) }} colorMap={{ "Bus Count": "green" }} />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">Waiting Time</h2>
          <BusRadarChart stationName={selectedStation} data={{ "wait time": filterData(waitTimeData) }} colorMap={{ "wait time": "darkorange" }} />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-center text-white">Entry & Exit Flow</h2>
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
