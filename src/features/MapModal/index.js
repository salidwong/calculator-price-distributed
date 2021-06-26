import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div onClick={() => console.log("on Click")}>{text}</div>
);

export const MapModal = () => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{
          lat: 13.7563,
          lng: 100.5018,
        }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={13.7370587} lng={100.5603061} text="Asoke" />
      </GoogleMapReact>
    </div>
  );
};
