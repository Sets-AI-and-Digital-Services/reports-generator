const data = [
  { area: "Sayyid Al-Shuhada", buses: "38,885", dwell: "20,553" },
  { area: "Quba", buses: "17,894", dwell: "9,034" },
  { area: "Abyar Ali", buses: "10,991", dwell: "12,391" },
  { area: "The Seven Mosques", buses: "5,305", dwell: "950" },
  { area: "Qiblatain Mosque", buses: "1,976", dwell: "13,001" },
  { area: "Badr", buses: "658", dwell: "2,744" },
];

const BusVolumeTable = () => {
  return (
    <div className="p-6 rounded-lg w-full max-w-5xl mx-auto text-center">
      <p className="mb-24 text-xl font-medium md:text-3xl text-primary">Bus Counts & Dwelling Times per Location</p>

      <div className="text-xl flex flex-col gap-3">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] w-full rounded-xl text-3xl px-6 py-4 justify-between bg-[#CED4DA] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] items-center">
          <span className="text-gray-700 font-medium text-left">Area</span>
          <span className="text-gray-700 font-medium">Number of Buses</span>
          <span className="text-gray-700 font-medium">Dwell Time (Hrs)</span>
        </div>
        {data.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[1.5fr_1fr_1fr] w-full rounded-xl px-6 py-4 font-medium bg-white text-[#007367] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] items-center`}
          >
            <span className="text-left text-3xl text-[#343A40]">{row.area}</span>
            <span className="text-4xl">{row.buses}</span>
            <span className="text-4xl">{row.dwell}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusVolumeTable;
