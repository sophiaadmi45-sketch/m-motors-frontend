import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOption, setSortOption] = useState('');


  useEffect(() => {
    fetch(`${API_BASE_URL}/vehicles`)
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setFilteredVehicles(data);
      })
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    let result = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vehicle.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !typeFilter || vehicle.type === typeFilter;

      return matchesSearch && matchesType;
    });

    if (sortOption) {
      result.sort((a, b) => {
        if (sortOption === 'price-asc') return a.prix - b.prix;
        if (sortOption === 'price-desc') return b.prix - a.prix;
        if (sortOption === 'km-asc') return a.kilometrage - b.kilometrage;
        if (sortOption === 'km-desc') return b.kilometrage - a.kilometrage;
        return 0;
      });
    }

    setFilteredVehicles(result);
  }, [searchTerm, typeFilter, sortOption, vehicles]);

  
  return {
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    sortOption,
    setSortOption
  };
}