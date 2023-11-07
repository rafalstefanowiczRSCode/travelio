import "./App.css";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

function App() {
  return (
    <VectorMap
      onRegionTipShow={(e, label, code) => {
        return label.html(`
                  <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
                    <p>
                    <b>
                    ${label.html()}
                    </b>
                    </p>
                    </div>`);
      }}
      style={{
        height: "600px",
      }}
      regionsSelectable={true}
      onMarkerOver={(e) => {
        console.log(e);
      }}
      map={worldMill}
      onRegionClick={(e, code) => {
        console.log(e);
        console.log(code);
      }}
      series={{
        regions: [
          {
            values: { RU: 22, IN: 33, MY: 2 },
            scale: ["#aebaff", "#ca3232"],
            min: 0,
            max: 100,
          },
        ],
      }}
    />
  );
}

export default App;
