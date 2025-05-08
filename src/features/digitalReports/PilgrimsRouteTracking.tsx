import React, { useState } from "react";
import { motion } from "framer-motion";
import top_attractions from "../../../public/assets/top_attractions/top_attractions.svg";
import top_attractions_graph from "../../../public/assets/top_attractions/top_attractions_graph.svg";
import top_attractions_airport from "../../../public/assets/top_attractions/top_attractions_airport.svg";
import top_attractions_airport_1 from "../../../public/assets/top_attractions/top_attractions_airport_1.svg";
import top_attractions_airport_2 from "../../../public/assets/top_attractions/top_attractions_airport_2.svg";
import top_attractions_badr from "../../../public/assets/top_attractions/top_attractions_badr.svg";
import top_attractions_badr_1 from "../../../public/assets/top_attractions/top_attractions_badr_1.svg";
// import top_attractions_badr_2 from "../../../public/assets/top_attractions/top_attractions_badr_2.svg";
import top_attractions_central from "../../../public/assets/top_attractions/top_attractions_central.svg";
import top_attractions_central_1 from "../../../public/assets/top_attractions/top_attractions_central_1.svg";
import top_attractions_central_2 from "../../../public/assets/top_attractions/top_attractions_central_2.svg";
import top_attractions_furaidi from "../../../public/assets/top_attractions/top_attractions_furaidi.svg";
import top_attractions_furaidi_1 from "../../../public/assets/top_attractions/top_attractions_furaidi_1.svg";
import top_attractions_furaidi_2 from "../../../public/assets/top_attractions/top_attractions_furaidi_2.svg";
import top_attractions_hajj_south_city from "../../../public/assets/top_attractions/top_attractions_hajj_south_city.svg";
import top_attractions_hajj_south_city_1 from "../../../public/assets/top_attractions/top_attractions_hajj_south_city_1.svg";
import top_attractions_hajj_south_city_2 from "../../../public/assets/top_attractions/top_attractions_hajj_south_city_2.svg";
import top_attractions_miqat from "../../../public/assets/top_attractions/top_attractions_miqat.svg";
import top_attractions_miqat_1 from "../../../public/assets/top_attractions/top_attractions_miqat_1.svg";
import top_attractions_miqat_2 from "../../../public/assets/top_attractions/top_attractions_miqat_2.svg";
import top_attractions_qiblatain from "../../../public/assets/top_attractions/top_attractions_qiblatain.svg";
import top_attractions_qiblatain_1 from "../../../public/assets/top_attractions/top_attractions_qiblatain_1.svg";
// import top_attractions_qiblatain_2 from "../../../public/assets/top_attractions/top_attractions_qiblatain_2.svg";
import top_attractions_quba from "../../../public/assets/top_attractions/top_attractions_quba.svg";
import top_attractions_quba_1 from "../../../public/assets/top_attractions/top_attractions_quba_1.svg";
import top_attractions_quba_2 from "../../../public/assets/top_attractions/top_attractions_quba_2.svg";
import top_attractions_sayyid from "../../../public/assets/top_attractions/top_attractions_sayyid.svg";
import top_attractions_sayyid_1 from "../../../public/assets/top_attractions/top_attractions_sayyid_1.svg";
import top_attractions_sayyid_2 from "../../../public/assets/top_attractions/top_attractions_sayyid_2.svg";
import top_attractions_seven_mosque from "../../../public/assets/top_attractions/top_attractions_seven_mosque.svg";
import top_attractions_seven_mosque_1 from "../../../public/assets/top_attractions/top_attractions_seven_mosque_1.svg";
// import top_attractions_seven_mosque_2 from "../../../public/assets/top_attractions/top_attractions_seven_mosque_2.svg";
import top_attractions_train from "../../../public/assets/top_attractions/top_attractions_train.svg";
import top_attractions_train_1 from "../../../public/assets/top_attractions/top_attractions_train_1.svg";
import top_attractions_train_2 from "../../../public/assets/top_attractions/top_attractions_train_2.svg";
import top_attractions_temp from "../../../public/assets/top_attractions/top_attractions_temp.svg";

const PilgrimsRouteTracking: React.FC = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const markers = [
    { id: 1, image: top_attractions_airport, image_1: top_attractions_airport_1,
      image_2: top_attractions_airport_2, top: "5%", left: "16%", text: "Airport", width: "6.75rem" },
    { id: 2, image: top_attractions_badr, image_1: top_attractions_badr_1,
      image_2: top_attractions_temp, top: "77%", left: "50%", text: "Badr (NB: 3,106 | DT: 4.7 Hrs)", width: "5.18rem" },
    {
      id: 3,
      image: top_attractions_central,
      image_1: top_attractions_central_1,
      image_2: top_attractions_central_2,
      top: "30%",
      left: "42%",
      text: "Central Area",
      width: "10rem",
    },
    {
      id: 4,
      image: top_attractions_furaidi,
      image_1: top_attractions_furaidi_1,
      image_2: top_attractions_furaidi_2,
      top: "22%",
      left: "85%",
      text: "Al-Furaidi Station",
      width: "13.43rem",
    },
    {
      id: 5,
      image: top_attractions_hajj_south_city,
      image_1: top_attractions_hajj_south_city_1,
      image_2: top_attractions_hajj_south_city_2,
      top: "60%",
      left: "65%",
      text: "Hajj South City",
      width: "11.875rem",
    },
    {
      id: 6,
      image: top_attractions_miqat,
      image_1: top_attractions_miqat_1,
      image_2: top_attractions_miqat_2,
      top: "63%",
      left: "91%",
      text: "Miqat (NB: 10,991| DT: 12,391 Hrs)",
      width: "6rem",
    },
    {
      id: 7,
      image: top_attractions_qiblatain,
      image_1: top_attractions_qiblatain_1,
      image_2: top_attractions_temp,
      top: "3%",
      left: "70%",
      text: "Qiblatain Mosque (NB: 1,099 | DT: 4 Hrs)",
      width: "13.75rem",
    },
    {
      id: 8,
      image: top_attractions_quba,
      image_1: top_attractions_quba_1,
      image_2: top_attractions_quba_2,
      top: "30%",
      left: "67%",
      text: "Quba Mosque (NB: 17,894 | DT: 9,034 Hrs)",
      width: "5.68rem",
    },
    {
      id: 9,
      image: top_attractions_sayyid,
      image_1: top_attractions_sayyid_1,
      image_2: top_attractions_sayyid_2,
      top: "30%",
      left: "3%",
      text: "Sayyid Al-Shuhada Mosque (NB: 38,885 | DT: 20,553 Hrs)",
      width: "19.75rem",
    },
    {
      id: 10,
      image: top_attractions_seven_mosque,
      image_1: top_attractions_seven_mosque_1,
      image_2: top_attractions_temp,
      top: "53%",
      left: "32%",
      text: "The Seven Mosques (NB: 5,305 | DT: 950 Hrs)",
      width: "14.9rem",
    },
    {
      id: 11,
      image: top_attractions_train,
      image_1: top_attractions_train_1,
      image_2: top_attractions_train_2,
      top: "5%",
      left: "38.5%",
      text: " Train Station",
      width: "10.375rem",
    },
  ];

  return (
    <section className="w-full h-screen pt-8 bg-[#fff]">
      <div className="mx-auto text-center relative">
        <p className="-top-8 left-0 right-0 absolute text-xl font-medium md:text-7xl text-primary">Top Attractions</p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl"
        >
          <img src={top_attractions} className="w-full h-full" />
          <img src={top_attractions_graph} className="w-[30rem] absolute left-0 bottom-16" />

          {markers.map((marker, index) => (
            <div key={`${marker.id}-${index}`} style={{ top: marker.top, left: marker.left }} className="absolute z-10">
              <button
                onClick={() => setActiveMarker(marker.id === activeMarker ? null : marker.id)}
                className={`flex justify-center items-center p-2 rounded-full relative z-10`}
              >
                <img src={marker.image} alt={`marker-${marker.id}`} className="object-contain" style={{ width: marker.width }} />
              </button>
            </div>
          ))}

          {activeMarker !== null && (
            <div className="fixed inset-0 z-[999] bg-black bg-opacity-75 flex justify-center items-center">
              <div className="bg-white rounded-2xl shadow-2xl pt-4 px-8 w-[95%] h-[95%] overflow-y-auto relative">
                {/* Header row */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-semibold text-[#343A40]">{markers.find((m) => m.id === activeMarker)?.text}</h2>
                  <button className="text-[#343A40] text-lg font-bold px-4 py-2 rounded hover:bg-gray-100" onClick={() => setActiveMarker(null)}>
                    ✕ Close
                  </button>
                </div>

                {/* Image */}
                <div className="w-full flex flex-col justify-center gap-4">
                  <img src={markers.find((m) => m.id === activeMarker)?.image_1} alt="Marker" className="max-w-full h-64 object-cover rounded-xl" />
                  <img src={markers.find((m) => m.id === activeMarker)?.image_2} alt="Marker" className="w-[85%] rounded-xl m-auto" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PilgrimsRouteTracking;
