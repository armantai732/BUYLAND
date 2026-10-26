
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  Plus,
  Minus,
  Navigation,
  Building2,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

// Fix default Leaflet marker icons in Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const popularLocations = [
  {
    name: "Ahmedabad",
    count: "120+ Properties",
    position: [23.0225, 72.5714],
  },
  {
    name: "Gandhinagar",
    count: "85+ Properties",
    position: [23.2156, 72.6369],
  },
  {
    name: "Mehsana",
    count: "62+ Properties",
    position: [23.588, 72.3693],
  },
  {
    name: "Surendranagar",
    count: "48+ Properties",
    position: [22.727, 71.648],
  },
  {
    name: "Rajkot",
    count: "36+ Properties",
    position: [22.3039, 70.8022],
  },
];

// Custom luxury map marker
const luxuryIcon = L.divIcon({
  className: "luxury-map-marker",
  html: `
    <div style="
      width: 38px;
      height: 38px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background: #c8a96b;
      border: 3px solid #ffffff;
      box-shadow: 0 3px 14px rgba(0,0,0,.28);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #142b2d;
      "></div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Moves the map when a city is selected
function MapFocus({ selectedCity }) {
  const map = useMap();

  useEffect(() => {
    const location = popularLocations.find(
      (item) => item.name === selectedCity
    );

    if (location) {
      map.flyTo(location.position, 10, {
        duration: 1.2,
      });
    }
  }, [selectedCity, map]);

  return null;
}

// Zoom and reset controls
function MapControls() {
  const map = useMap();

  return (
    <div className="absolute bottom-5 right-5 z-[1000] flex flex-col gap-2">
      <button
        type="button"
        title="My map view"
        onClick={() => map.flyTo([23.0225, 72.5714], 9, { duration: 1 })}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c8a96b]/40 bg-[#102729] text-[#d9bd80] shadow-lg transition hover:bg-[#c8a96b] hover:text-[#102729]"
      >
        <Navigation size={18} />
      </button>

      <div className="overflow-hidden rounded-xl border border-[#c8a96b]/40 bg-[#102729] shadow-lg">
        <button
          type="button"
          title="Zoom in"
          onClick={() => map.zoomIn()}
          className="flex h-11 w-11 items-center justify-center text-[#d9bd80] transition hover:bg-[#c8a96b] hover:text-[#102729]"
        >
          <Plus size={19} />
        </button>

        <div className="mx-2 border-t border-[#c8a96b]/20" />

        <button
          type="button"
          title="Zoom out"
          onClick={() => map.zoomOut()}
          className="flex h-11 w-11 items-center justify-center text-[#d9bd80] transition hover:bg-[#c8a96b] hover:text-[#102729]"
        >
          <Minus size={19} />
        </button>
      </div>
    </div>
  );
}

export default function ExploreNearYou() {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = popularLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const selectedLocation = popularLocations.find(
    (location) => location.name === selectedCity
  );

  return (
    <section className="bg-[#f8f7f3] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b99a5b]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a18449]">
                Discover Your Location
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight text-[#142b2d] sm:text-4xl lg:text-5xl">
              Explore Properties
              <span className="block italic text-[#b99a5b]">
                Near You
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-600 sm:text-base">
            Discover promising locations across Gujarat and explore
            the areas where your next property investment awaits.
          </p>
        </div>

        {/* Map and locations */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Real interactive map */}
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-[#c8a96b]/30 bg-[#e8e6df] shadow-xl sm:min-h-[480px] lg:col-span-8">
            <MapContainer
              center={[23.0225, 72.5714]}
              zoom={9}
              scrollWheelZoom={true}
              zoomControl={false}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {popularLocations.map((location) => (
                <Marker
                  key={location.name}
                  position={location.position}
                  icon={luxuryIcon}
                  eventHandlers={{
                    click: () => handleCitySelect(location.name),
                  }}
                >
                  <Popup>
                    <div className="min-w-[150px]">
                      <p className="text-base font-semibold text-[#142b2d]">
                        {location.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {location.count}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <MapFocus selectedCity={selectedCity} />
              <MapControls />
            </MapContainer>

            {/* Search overlay */}
            <div className="pointer-events-none absolute left-4 right-4 top-4 z-[40] sm:left-6 sm:right-auto sm:w-[350px]">
              <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">
                <Search className="shrink-0 text-[#b99a5b]" size={20} />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search city or location..."
                  className="w-full bg-transparent text-sm text-[#142b2d] outline-none placeholder:text-gray-400"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-gray-500 hover:text-[#142b2d]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="pointer-events-auto mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <button
                        type="button"
                        key={location.name}
                        onClick={() => {
                          handleCitySelect(location.name);
                          setSearchQuery("");
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#f8f7f3]"
                      >
                        <MapPin size={17} className="text-[#b99a5b]" />

                        <span>
                          <span className="block text-sm font-medium text-[#142b2d]">
                            {location.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {location.count}
                          </span>
                        </span>

                        <ArrowRight
                          size={16}
                          className="ml-auto text-gray-400"
                        />
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-4 text-sm text-gray-500">
                      No matching locations found.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Selected city information */}
            <div className="pointer-events-none absolute bottom-5 left-4 z-[40] max-w-[calc(100%-100px)] sm:bottom-6 sm:left-6">
              <div className="rounded-2xl border border-white/70 bg-[#102729]/95 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:px-5 sm:py-4">
                <div className="mb-1 flex items-center gap-2 text-xs text-[#d9bd80]">
                  <MapPin size={14} />
                  SELECTED LOCATION
                </div>

                <p className="font-serif text-xl sm:text-2xl">
                  {selectedCity}
                </p>

                <p className="mt-1 text-xs text-white/70">
                  {selectedLocation?.count || "Explore this area"}
                </p>
              </div>
            </div>
          </div>

          {/* Popular locations panel */}
          <div className="flex flex-col rounded-3xl border border-[#e5dfd1] bg-white p-5 shadow-sm sm:p-7 lg:col-span-4">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b99a5b]">
                  Handpicked Areas
                </p>

                <h3 className="font-serif text-2xl text-[#142b2d] sm:text-3xl">
                  Popular Locations
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f6f1e5] text-[#a18449]">
                <Building2 size={21} />
              </div>
            </div>

            <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#f8f7f3] px-3 py-2.5">
              <Search size={16} className="text-[#a18449]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Find a city..."
                className="w-full bg-transparent text-sm text-[#142b2d] outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => {
                  const isActive = selectedCity === location.name;

                  return (
                    <button
                      type="button"
                      key={location.name}
                      onClick={() => handleCitySelect(location.name)}
                      className={`group flex items-center gap-3 border-b border-[#eeeae1] py-4 text-left transition last:border-b-0 ${
                        isActive
                          ? "rounded-xl border-b-transparent bg-[#f8f5ed] px-3"
                          : "px-2 hover:bg-[#faf9f6]"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                          isActive
                            ? "bg-[#142b2d] text-[#d9bd80]"
                            : "bg-[#f4f1e9] text-[#a18449] group-hover:bg-[#eae2d0]"
                        }`}
                      >
                        <MapPin size={18} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-sm font-semibold ${
                            isActive ? "text-[#142b2d]" : "text-gray-700"
                          }`}
                        >
                          {location.name}
                        </span>

                        <span className="mt-1 block text-xs text-gray-500">
                          {location.count}
                        </span>
                      </span>

                      <ArrowRight
                        size={17}
                        className={`shrink-0 transition ${
                          isActive
                            ? "translate-x-0 text-[#b99a5b]"
                            : "-translate-x-1 text-gray-300 group-hover:translate-x-0 group-hover:text-[#b99a5b]"
                        }`}
                      />
                    </button>
                  );
                })
              ) : (
                <p className="py-6 text-center text-sm text-gray-500">
                  No locations found.
                </p>
              )}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-2xl bg-[#142b2d] p-5 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-[#d9bd80]">
                  Find Your Next Investment
                </p>

                <p className="mt-2 font-serif text-xl">
                  The right location changes everything.
                </p>

                <p className="mt-2 text-xs leading-6 text-white/65">
                  Explore the map, select a city, and discover your
                  preferred property destination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#b99a5b]" />
            Interactive map powered by OpenStreetMap
          </p>

          <p>Map data © OpenStreetMap contributors</p>
        </div>
      </div>
    </section>
  );
}
