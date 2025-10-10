import React, { useState } from 'react';

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState('zattraType');

  // State for ZATRA Type search
  const [zattraTypeSelections, setZattraTypeSelections] = useState({
    Religious: false,
    Cultural: false,
    Adventure: false,
    Trekking: false,
    Eco: false,
    Medical: false,
    Trade: false,
    Business: false,
  });

  // State for Trip search
  const [tripSearch, setTripSearch] = useState({
    location: '',
    tripDate: '',
    periodTime: '',
    festivals: '',
    occasion: '',
  });

  // Handle toggle for ZATRA type buttons
  const toggleZattraType = (type) => {
    setZattraTypeSelections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle input changes for trip search form
  const handleTripChange = (e) => {
    const { name, value } = e.target;
    setTripSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Search button handlers
  const searchZattraType = () => {
    const selectedTypes = Object.keys(zattraTypeSelections).filter(
      (type) => zattraTypeSelections[type]
    );
    alert(`Searching for ZATRA Types: ${selectedTypes.join(', ') || 'None'}`);
  };

  const searchTrip = () => {
    alert(
      `Searching Trip with: Location: ${tripSearch.location}, Date: ${tripSearch.tripDate}, Period: ${tripSearch.periodTime}, Festivals: ${tripSearch.festivals}, Occasion: ${tripSearch.occasion}`
    );
  };

  return (
    <div className='px-3'>

      <div className='shadow-card bg-white md:translate-y-[-30px] lg:-translate-y-[60px] max-w-[800px] mx-auto rounded-[10px] my-12 md:my-0'>
        <div className='mx-6 md:mx-0 '>

          <div className='sm:flex ' >
            <div className='py-4 md:px-8 px-4 sm:mb-0 sm-3'
              onClick={() => setActiveTab('zattraType')}
              style={{

                borderRadius: '10px 0 0 0',
                color: activeTab === 'zattraType' ? 'var(--web-card)' : 'var(--web-primary)',
                fontWeight: activeTab === 'zattraType' ? '600' : 'normal',
                cursor: 'pointer',
                backgroundColor: activeTab === 'zattraType' ? 'var(--web-primary)' : 'var(--web-secondary)',
              }}
            >
              Search For ZATRA Type
            </div>
            <div
              className='py-4 md:px-8 px-2'
              onClick={() => setActiveTab('trip')}
              style={{
                // padding: 12,
                // borderBottom: activeTab === 'trip' ? '4px solid #036' : 'none',
                color: activeTab === 'trip' ? 'var(--web-card)' : 'var(--web-primary)',
                fontWeight: activeTab === 'trip' ? '600' : 'normal',
                backgroundColor: activeTab === 'trip' ? 'var(--web-primary)' : 'var(--web-secondary)',
                cursor: 'pointer',
              }}
            >
              Search For Trip
            </div>
          </div>
          <div className='md:px-4 py-3 md:py-5'>

            {activeTab === 'zattraType' && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[
                    { label: 'Religious/ Pilgrimage', key: 'Religious' },
                    { label: 'Cultural/ Heritage', key: 'Cultural' },
                    { label: 'Adventure/ Sports', key: 'Adventure' },
                    { label: 'Trekking/Mountaineering', key: 'Trekking' },
                    { label: 'Eco/ Rural Tourism', key: 'Eco' },
                    { label: 'Medical/ Health Tourism', key: 'Medical' },
                    { label: 'Trade/ Shopping Tourism', key: 'Trade' },
                    { label: 'Business/ Conference Tourism', key: 'Business' },
                  ].map(({ label, key }) => (
                    <button
                      key={key}
                      onClick={() => toggleZattraType(key)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 5,
                        border: `1px solid var(--web-primary)`,
                        backgroundColor: zattraTypeSelections[key] ? 'var(--web-primary)' : 'transparent',
                        color: zattraTypeSelections[key] ? 'white' : 'var(--web-primary)',
                        cursor: 'pointer',
                      }}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 20, textAlign: 'right' }}>
                  <button
                    onClick={searchZattraType}
                    className='zatra-btn-fill cursor-pointer'
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'trip' && (
              <div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4'>
                <input
                  type="text"
                  name="location"
                  value={tripSearch.location}
                  onChange={handleTripChange}
                  placeholder="Search for Location"
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    border: '1px solid #ccc',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                  }}
                />
                <input
                  type="date"
                  name="tripDate"
                  value={tripSearch.tripDate}
                  onChange={handleTripChange}
                  placeholder="Choose a Trip Date"
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    border: '1px solid #ccc',
                    fontSize: 14,
                  }}
                />
                <input
                  type="text"
                  name="periodTime"
                  value={tripSearch.periodTime}
                  onChange={handleTripChange}
                  placeholder="Search a Period Time"
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    border: '1px solid #ccc',
                    fontSize: 14,
                  }}
                />
                <input
                  type="text"
                  name="festivals"
                  value={tripSearch.festivals}
                  onChange={handleTripChange}
                  placeholder="Search for Festivals"
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    border: '1px solid #ccc',
                    fontSize: 14,
                  }}
                />
                <input
                  type="text"
                  name="occasion"
                  value={tripSearch.occasion}
                  onChange={handleTripChange}
                  placeholder="Search For Occasion"
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    border: '1px solid #ccc',
                    fontSize: 14,
                  }}
                />
                <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                  <button
                    onClick={searchTrip}
                    className='zatra-btn-fill cursor-pointer'

                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTabs;
