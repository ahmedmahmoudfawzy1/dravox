import { useMemo, useState } from 'react';
import { useShippingCountries } from '../../hooks/useShippingCountries';

const CountrySelect = ({ onSelect }) => {
    const { data } = useShippingCountries();
    const [selected, setSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    const supportedCountries = useMemo(() => {
        return data?.map(country => country.code) || [];
    }, [data]);

    const handleSelect = (country) => {
        if (!supportedCountries.includes(country.code)) {
            setErrorMessage("Sorry, we do not deliver to this country. 🚫");
            return;
        }
        setErrorMessage('');
        setSelected(country);
        onSelect?.(country.code);
        // console.log(country.code);
        setOpen(false);
    };

    return (
        <div style={{ width: "100%", position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#fff' }}>
                Choose Country :
            </label>

            <div
                style={{
                    padding: '10px',
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer'
                }}
                onClick={() => setOpen(!open)}
            >
                {selected ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={selected.flag} alt="" style={{ width: '20px', height: '14px' }} />
                        {selected.name}
                    </span>
                ) : "Choose Country"}
            </div>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        backgroundColor: '#1f1f1f',
                        border: '1px solid #444',
                        borderRadius: '6px',
                        marginTop: '4px',
                        zIndex: 9999,
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}
                >
                    {data?.map((country) => {
                        const isDisabled = !supportedCountries.includes(country.code);
                        return (
                            <div
                                key={country.code}
                                onClick={() => !isDisabled && handleSelect(country)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px',
                                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                                    color: isDisabled ? '#666' : '#fff',
                                    backgroundColor: '#1f1f1f',
                                }}
                            >
                                <img src={country.flag} alt="" style={{ width: '20px', height: '14px' }} />
                                {country.name}
                            </div>
                        );
                    })}
                </div>
            )}

            {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
            )}
        </div>
    );
};

export default CountrySelect;
